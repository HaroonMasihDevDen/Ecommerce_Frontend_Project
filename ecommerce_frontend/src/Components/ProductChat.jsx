import { checkIfUserAuthAndNavigate } from "../service/authUser";
import React, { useState, useEffect, useRef } from 'react';
import ActionCable from 'actioncable';
import { FaPaperPlane } from "react-icons/fa";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { CREATE_CHAT_API } from "../config/api";
import axios from "axios";

const ProductChat = ({ productId, user_id, chats }) => {
	const [messages, setMessages] = useState(chats || []);
	const [newMessage, setNewMessage] = useState('');
	const cableRef = useRef(null);
	const chatEndRef = useRef(null);

	useEffect(() => {
		cableRef.current = ActionCable.createConsumer('ws://localhost:3001/cable');

		// Subscribe to the product-specific chat channel
		const subscription = cableRef.current.subscriptions.create(
			{ channel: 'ProductChatChannel', product_id: productId },
			{
				received: (data) => {
					setMessages((prevMessages) => [...prevMessages, data]);
				},
			}
		);

		return () => {
			subscription.unsubscribe();
		};
	}, [productId]);

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = async () => {
		if (!checkIfUserAuthAndNavigate()) {
			alert('Please login to send a message.');
			return;
		}

		if (newMessage.trim()) {
			const response = await axios.post(
				`${CREATE_CHAT_API(productId)}`,
				{
					product_id: productId,
					user_id: user_id,
					question: newMessage,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: Cookies.get("Authorization") || null,
					},
				}
			);

			// fetch(CREATE_CHAT_API(productId), {
			//     method: 'POST',
			//     headers: {
			//         'Content-Type': 'application/json',
			//         'Authorization': Cookies.get("Authorization") || null,
			//     },
			//     body: JSON.stringify({ chat: { question: newMessage, user_id: user_id, product_id: productId } }),
			// })
			//     .then((response) => response.json())
			//     .then(() => setNewMessage(''))
			//     .catch((error) => console.error('Error sending message:', error));
		}
	};

	const formatChatTimestamp = (date) => {
		const d = new Date(date);
		const now = new Date();
		const isToday = d.toDateString() === now.toDateString();
		const isYesterday = d.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

		if (isToday) return format(d, "h:mm a");
		if (isYesterday) return `Yesterday at ${format(d, "h:mm a")}`;
		return format(d, "MMM d, yyyy 'at' h:mm a");
	};

	return (
		<>
			<div className="font-roboto w-full ms-8 max-w-md flex flex-col h-[500px] border border-gray-300 rounded-lg shadow-lg bg-white">
				<h1 className='text-center p-4'> <b>Product Chat</b></h1>
				<div className="flex-1 overflow-y-auto p-1 space-y-1">
					{messages.map((msg, index) => (
						<div key={index}>
							<div
								className='pt-2 px-1 max-w-[95%] rounded-lg text-black'
							>
								<div className='flex flex-col ps-3'>
									<div className='flex space-x-4 py-auto text-center'>
										<span className='bg-red-300 p-[2px] h-[27px] w-[25px] rounded-md'>
											Q
										</span>
										<span className="text-start my-auto">
											{msg.question}
										</span>
									</div>
									<div className="flex flex-row justify-end space-x-4">

										<span className='text-[0.7rem] flex items-start text-start'>
											{msg.user_name}
										</span>
										<span className='text-[0.7rem] flex items-start text-start'>
											{formatChatTimestamp(msg.created_at)}
										</span>
									</div>
								</div>
							</div>

							<div
								className='py-2 px-1 max-w-[95%] rounded-lg text-black'
							>
								<div className='flex justify-between ps-3'>
									<div className='flex space-x-4'> {/* Container for left items */}
										<span className='bg-blue-300 p-[2px] h-[27px] w-[25px] rounded-md'>
											A
										</span>
										<span className="text-start">
											{msg.answer}
										</span>
									</div>
									<span className='text-[0.7rem] flex items-center'>
										{formatChatTimestamp(msg.created_at)}
									</span>
								</div>
							</div>
							<hr />
						</div>
					))}
					<div ref={chatEndRef} />
				</div>
				{/* Chat Input */}
				<div className="flex items-center border-t border-gray-300 p-3 bg-gray-100">
					<input
						type="text"
						className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
						placeholder="Type a message..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
					/>
					<button
						onClick={handleSendMessage}
						className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
					>
						<FaPaperPlane />
					</button>
				</div>
			</div >
		</>
	);
};

export default ProductChat;