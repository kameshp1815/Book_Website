import { useState } from 'react';
import axios from 'axios';

const Debug = () => {
  const [apiStatus, setApiStatus] = useState('Not tested');
  const [testResult, setTestResult] = useState('');

  const testAPI = async () => {
    try {
      setApiStatus('Testing...');
      const response = await axios.get('http://localhost:5000');
      setApiStatus('✅ Backend is running');
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setApiStatus('❌ Backend connection failed');
      setTestResult(`Error: ${error.message}`);
    }
  };

  const testRegister = async () => {
    try {
      setApiStatus('Testing registration...');
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
      setApiStatus('✅ Registration works');
      setTestResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setApiStatus('❌ Registration failed');
      setTestResult(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Backend Connection Test</h2>
          <div className="space-y-4">
            <button
              onClick={testAPI}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Backend Connection
            </button>
            
            <button
              onClick={testRegister}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
            >
              Test Registration
            </button>
          </div>
          
          <div className="mt-4">
            <p className="text-lg font-medium">Status: {apiStatus}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Result</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {testResult || 'No test run yet'}
          </pre>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Backend Requirements:</h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Backend should be running on http://localhost:5000</li>
            <li>• POST /api/auth/register endpoint should be available</li>
            <li>• POST /api/auth/login endpoint should be available</li>
            <li>• CORS should be enabled for frontend requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Debug;