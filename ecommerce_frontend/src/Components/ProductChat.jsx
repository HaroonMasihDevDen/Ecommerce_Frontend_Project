import { checkIfUserAuthAndNavigate, checkIfUserAuth } from "../service/authUser";
import React, { useState, useEffect, useRef } from 'react';
import { createConsumer } from '@rails/actioncable';
import { FaPaperPlane } from "react-icons/fa";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { CREATE_CHAT_API } from "../config/api";
import axios from "axios";
import ChatIcon from './ChatIcon';


const ProductChat = ({ productId, user_id, chats }) => {
	const [messages, setMessages] = useState(chats || []);
	const [newMessage, setNewMessage] = useState('');
	const [channel, setChannel] = useState(null);
	const [userSessionActive, setUserSessionActive] = useState(false);
	const chatEndRef = useRef(null);
	const consumerRef = useRef(null);
	console.log("chats::", chats);

	useEffect(() => {
		// Create consumer only once
		if (!consumerRef.current) {
			consumerRef.current = createConsumer('ws://localhost:3001/cable');
		}

		// Create subscription
		const subscription = consumerRef.current.subscriptions.create(
			{
				channel: 'ProductChatChannel',
				product_id: productId
			},
			{
				received: (data) => {
					console.log('Received message:', data);
					if (data.action === 'create') {
						setMessages(prevMessages => {
							const exists = prevMessages.some(msg => msg.id === data.id);
							if (!exists) {
								return [...prevMessages, data];
							}
							return prevMessages;
						});
					} else if (data.action === 'update') {
						setMessages(prevMessages =>
							prevMessages.map(msg =>
								msg.id === data.id
									? { ...msg, answer: data.answer }
									: msg
							)
						);
					}
				},
				connected: () => {
					console.log('Connected to ProductChatChannel');
				},
				disconnected: () => {
					console.log('Disconnected from ProductChatChannel');
				}
			}
		);

		// Set the channel state to the subscription
		setChannel(subscription);

		// Cleanup function
		return () => {
			if (subscription) {
				subscription.unsubscribe();
			}
		};
	}, [productId]);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = await checkIfUserAuth();
			setUserSessionActive(isAuthenticated);
		};

		checkAuth();
	}, []);

	const handleSendMessage = async () => {
		let user_session_exist = checkIfUserAuthAndNavigate();
		if (!user_session_exist) {
			alert('Please login to send a message.');
			return;
		}

		if (!channel) {
			console.error('WebSocket connection not established');
			return;
		}

		if (newMessage.trim() && user_session_exist) {
			try {
				// Send through Action Cable
				channel.perform('receive', {
					question: newMessage,
					user_id: user_id,
					product_id: productId
				});

				// Clear the input field
				setNewMessage('');
			} catch (error) {
				console.error('Error sending message:', error);
				alert('Failed to send message. Please try again.');
			}
		}
	};

	const formatChatTimestamp = (date) => {
		if (!date) return '';
		const d = new Date(date);
		const now = new Date();
		const isToday = d.toDateString() === now.toDateString();
		const isYesterday = d.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

		if (isToday) return format(d, "h:mm a");
		if (isYesterday) return `Yesterday at ${format(d, "h:mm a")}`;
		return format(d, "MMM d, yyyy 'at' h:mm a");
	};


	return (
		<div className="font-roboto ms-12 w-[35vw] max-h-[70vh] flex flex-col border border-gray-300 rounded-lg shadow-xl bg-white">
			{/* Header */}
			<div className="bg-primary-light text-white text-lg font-semibold text-center py-3 rounded-t-lg mt-[-1px] mx-[-1px] shadow-md">
				Product Chat
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
				{messages.length === 0 ? (
					<p className="text-gray-600 text-center py-12">No messages yet.</p>
				) : (
					messages.map((msg, index) => (
						<div key={msg.id} className="flex flex-col space-y-1 bg-white shadow p-3 rounded-lg max-w-[90%] text-gray-800">
							{/* User Question & Answer Merged */}
							<div className="flex flex-col space-y-6">
								<div className="flex items-top justify-between">
									<span className="flex items-top space-x-3">

										<ChatIcon text="Q" size={40} bubbleColor="#e04f2b" textColor="#FFFFFF" />
										<span className="text-start">{msg.question}</span>
									</span>


									<div className="text-xs flex align-self-end text-gray-500 text-right">{msg.user_name} • {formatChatTimestamp(msg.created_at)}</div>
								</div>

								{msg.answer && (
									<>
										<div className="flex items-top justify-between">
											<span className="flex items-top space-x-3">

												<ChatIcon text="A" size={40} bubbleColor="#1b90e3" textColor="#FFFFFF" />

												<span className="text-start">{msg.answer}</span>
											</span>
											<div className="text-xs text-gray-500 text-right mt-2">{msg.user_name} • {formatChatTimestamp(msg.updated_at)}</div>
										</div>
									</>
								)}
							</div>
						</div>
					)
					))}
				<div ref={chatEndRef} />
			</div>

			{/* Chat Input */}
			<div className="flex items-center border-t border-gray-300 p-3 bg-white shadow-md rounded-b-lg">
				<input
					type="text"
					className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Type a message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
				/>
				<button
					onClick={handleSendMessage}
					disabled={!userSessionActive}
					className={`ml-3 p-3 rounded-full transition-all ${userSessionActive === true ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
						}`}
					title={userSessionActive ? "" : "Please login to ask a query"}
				>
					<FaPaperPlane />
				</button>
			</div>
		</div>
	);
}


export default ProductChat;