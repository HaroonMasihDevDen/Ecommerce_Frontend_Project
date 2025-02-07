import React, { useState } from 'react';
import { format } from 'date-fns';

const AdminMessagesTable = ({ messages, onSubmitResponse }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [response, setResponse] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log("chat messages : ", messages);

  const handleRowClick = (message) => {
    setSelectedMessage(message);
    setResponse('');
    setIsDialogOpen(true);
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;

    await onSubmitResponse({
      messageId: selectedMessage.id,
      response: response.trim()
    });

    setIsDialogOpen(false);
    setResponse('');
    setSelectedMessage(null);
  };

  return (
    <div className="space-y-4 flex justify-center align-center ">
      <div className="overflow-x-auto  border border-gray-200 rounded-lg">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr className="">
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Question</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Answer</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message) => (
              <tr
                key={message.id}
                onClick={() => handleRowClick(message)}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {message.user_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                  {message.question}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                  {message.answer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.product_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(message.created_at), 'MMM dd, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${message.response
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {message.response ? 'Answered' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Respond to Customer Question</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedMessage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>From: {selectedMessage.user_name}</span>
                    <span>{format(new Date(selectedMessage.created_at), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {selectedMessage.question}
                  </div>
                  <div className="text-sm text-gray-500">
                    Product: {selectedMessage.product_name} (ID: {selectedMessage.product_id})
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Response:
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!response.trim()}
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesTable;