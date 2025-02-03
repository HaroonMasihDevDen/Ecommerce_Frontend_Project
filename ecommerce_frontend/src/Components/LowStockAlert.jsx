import React, { useState, useEffect, useContext } from 'react';
import ActionCable from 'actioncable';
import { FaTimes } from 'react-icons/fa';
const LowStockAlert = () => {
    const [notification, setNotification] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(true);

    useEffect(() => {
        const cable = ActionCable.createConsumer('ws://localhost:3001/cable');
        const subscription = cable.subscriptions.create('StockAlertChannel', {
            received: (data) => {
                setNotification(data.message);
                console.log(data.message);
            },
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (!notification) return null;

    return (
        <>
            {isNotificationVisible && (
                <div className='relative'>
                    <span className='bg-blue-400 rounded-full w-[1.5rem] h-[1.5rem] flex justify-center items-center text-white cursor-pointer text-[1rem] absolute top-0 right-0'
                        onClick={() => setIsNotificationVisible(false)}
                    >
                        <FaTimes />
                    </span>
                    <div className="rounded px-4 py-3 mx-2 my-2 left-0 bg-yellow-300 text-black text-center">
                        {notification}
                    </div>
                </div>
            )}
        </>

    );
};

export default LowStockAlert;