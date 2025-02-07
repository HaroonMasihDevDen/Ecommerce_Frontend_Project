import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR'
  }).format(amount);
};

const CheckoutForm = ({
  discount = 0,
  total = 0,
  subtotal = 0,
  shipping = 0,
  currency = 'pkr',
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const grandTotal = total - discount + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        onError?.(stripeError);
        return;
      }

      console.log("sending request to : " + paymentMethod.id);

      // Send payment to backend
      const response = await fetch("http://localhost:3001/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: Math.round(grandTotal * 100), // Convert to cents
          currency: "pkr",
        }),
      });

      debugger;

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        onError?.(data.error);
      } else {
        onSuccess?.(data);
        navigate("/payment-success");
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      onError?.(err);
    }

    setProcessing(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="grid md:grid-cols-5 gap-6">
        {/* Order Summary Section */}
        <div className="md:col-span-2 p-10 bg-gray-50 rounded-l-xl">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}

            <div className="pt-3 border-t">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={16} />
              <span>Secure 256-bit SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock size={16} />
              <span>Privacy and security guaranteed</span>
            </div>
          </div>
        </div>

        {/* Payment Form Section */}
        <div className="md:col-span-3 p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Card Information
              </label>
              <div className="border rounded-md p-4 bg-white">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || processing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium
                       hover:bg-blue-700 transition-colors duration-200
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              {processing ? 'Processing...' : `Pay ${formatCurrency(grandTotal)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const StripePaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state values
  const { subtotal, discount, total } = location.state || {};

  // Redirect to cart if no values are present
  useEffect(() => {
    if (!subtotal || !total) {
      navigate("/cart");
    }
  }, [subtotal, total, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          subtotal={subtotal}
          discount={discount}
          total={total}
          shipping={0}
          currency="pkr"
          onSuccess={(data) => {
            console.log("Payment successful!", data);
            navigate("/payment-success");
          }}
          onError={(error) => {
            console.error("Payment failed:", error);
          }}
        />
      </Elements>
    </div>
  );
};

export default StripePaymentForm;
