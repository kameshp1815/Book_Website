import Razorpay from 'razorpay';

export const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = 'INR' } = req.body || {};
    const amt = Number(amount);
    if (!amt || amt < 100) {
      return res.status(400).json({ message: 'Amount must be at least 100 paise (₹1.00)' });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      return res.status(500).json({ message: 'Razorpay keys are not configured on the server' });
    }

    const instance = new Razorpay({ key_id, key_secret });

    const order = await instance.orders.create({
      amount: amt,
      currency,
      receipt: `donation_${Date.now()}`,
      payment_capture: 1,
    });

    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getPublicKey = async (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  return res.status(200).json({ keyId });
};
