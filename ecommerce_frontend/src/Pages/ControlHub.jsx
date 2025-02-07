import React, { useEffect, useState } from 'react'
import AdminMessagesTable from '../Components/AdminMessagesTable';
import { getAllChats } from '../api/product';

// Import your components (you'll replace these with actual components)
const ProductsComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Products Management</h2>
    <p>Here you can add, edit, and manage your products.</p>
  </div>
);

const ProductQuestionsComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Product Questions</h2>
    <p>View and respond to customer questions about products.</p>
  </div>
);

const OrdersComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Orders</h2>
    <p>Manage and track customer orders.</p>
  </div>
);

const UsersComponent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">User Management</h2>
    <p>Manage user accounts and permissions.</p>
  </div>
);

const handleResponseSubmit = (messageId, response) => {
  console.log(`Message ${messageId} has been responded to with:`, response);
};

const AdminMessagesTableComponent = ({ chatList }) => (
  <div className="p-6 min-h-[70vh] bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
    <p className='py-4'>Reply to user queries.</p>
    <AdminMessagesTable messages={chatList} onSubmitResponse={handleResponseSubmit} />
  </div>
)

export default function ControlHub() {

  const [chatList, setChatList] = useState([]);

  const navigationItems = [
    {
      id: 'products',
      label: 'Products',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      component: ProductsComponent
    },
    {
      id: 'product-questions',
      label: 'Product Questions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      component: () => <AdminMessagesTableComponent chatList={chatList} />
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      component: OrdersComponent
    },
    {
      id: 'users',
      label: 'Users',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      component: UsersComponent
    }
  ];

  // State to track the currently selected navigation item
  const [selectedNav, setSelectedNav] = useState(navigationItems[0].id);

  // Find the component for the currently selected navigation item
  const SelectedComponent = navigationItems.find(item => item.id === selectedNav)?.component || ProductsComponent;

  useEffect(() => {
    setProductChats();
  }, []);

  const setProductChats = async () => {
    try {
      const response = await getAllChats();
      setChatList(response);
    } catch (error) {
      console.error("Error getting all chats :", error.response?.data);
      throw new Error(error.response?.statusText || "get all chats failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-5 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Control Hub</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setSelectedNav(item.id)}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
                  ${selectedNav === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <SelectedComponent />
      </div>
    </div>
  );
}