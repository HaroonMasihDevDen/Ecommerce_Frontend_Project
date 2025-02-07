import React from 'react';
import { CheckCircle, ShoppingBag, ClipboardList } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            Thank you for your purchase! Your order has been confirmed.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mt-4">
            <p className="text-blue-700 font-medium">
              Expected Delivery: 3-5 business days
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </a>

          <button
            onClick={() => window.close()}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ClipboardList className="w-5 h-5" />
            Check Order Status
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          You can safely close this page now. A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
}