import apiClient from './client';

export const createDonationOrder = async ({ amount, currency = 'INR' }) => {
  const res = await apiClient.post('/payments/create-order', { amount, currency });
  return res.data;
};

export const getRazorpayKey = async () => {
  const res = await apiClient.get('/payments/key');
  return res.data?.keyId || '';
};
