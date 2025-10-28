#!/usr/bin/env node

/**
 * OTP Verification Test Script
 * 
 * This script tests the OTP verification flow by:
 * 1. Registering a test user
 * 2. Checking if OTP is generated
 * 3. Verifying the OTP
 * 
 * Run with: node test-otp.js
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

async function testOTPFlow() {
  try {
    console.log('🧪 Testing OTP Verification Flow...\n');

    // Step 1: Register user
    console.log('1️⃣ Registering test user...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
    
    if (registerResponse.data.requiresVerification) {
      console.log('✅ User registered successfully!');
      console.log(`📧 OTP sent to: ${registerResponse.data.email}`);
      console.log(`🆔 User ID: ${registerResponse.data.userId}\n`);
      
      // Step 2: Test OTP verification (this will fail with invalid OTP, which is expected)
      console.log('2️⃣ Testing OTP verification with invalid code...');
      try {
        await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
          userId: registerResponse.data.userId,
          otp: '000000'
        });
        console.log('❌ This should not succeed with invalid OTP');
      } catch (error) {
        console.log('✅ Invalid OTP correctly rejected');
        console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
      }

      // Step 3: Test resend OTP
      console.log('3️⃣ Testing resend OTP...');
      try {
        const resendResponse = await axios.post(`${API_BASE_URL}/auth/resend-otp`, {
          userId: registerResponse.data.userId
        });
        console.log('✅ OTP resent successfully!');
        console.log(`   Message: ${resendResponse.data.message}\n`);
      } catch (error) {
        console.log('❌ Failed to resend OTP');
        console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
      }

      // Step 4: Test login with unverified user
      console.log('4️⃣ Testing login with unverified user...');
      try {
        await axios.post(`${API_BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('❌ Login should not succeed for unverified user');
      } catch (error) {
        console.log('✅ Unverified user correctly blocked from login');
        console.log(`   Error: ${error.response?.data?.message || error.message}\n`);
      }

    } else {
      console.log('❌ Registration did not require verification');
    }

    console.log('🎉 OTP flow test completed!');
    console.log('\n📝 Note: To complete the test, check your email for the actual OTP code');
    console.log('   and use it to verify the account manually.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running on port 5000');
    }
  }
}

// Run the test
testOTPFlow();
