import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./Components/Login";
import Temp from "./Components/Temp";
import "./App.css";
import Home from "./Pages/Home";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import Register from "./Components/Register";
import AdminMessagesTable from "./Components/AdminMessagesTable";
import ControlHub from "./Pages/ControlHub";
import StripePaymentForm from "./ComponentPayment/StripePaymentForm";
import PaymentSuccess from "./ComponentPayment/PaymentSuccess";

// Create a client
const queryClient = new QueryClient();
const yourMessagesList = [
	{
		id: 1,
		user_name: "John Doe",
		question: "Hello, how can I help you?",
		answer: "Hello, I'm here to assist you. What's your question?",
		product_name: "Product A",
		product_id: 1,
		created_at: "2023-01-01 10:00",
	},
	{
		id: 2,
		user_name: "Jane Smith",
		question: "Can I get some information about your products?",
		answer:
			"Yes, we have a wide range of products. Check out our website for more details.",
		product_name: "Product B",
		product_id: 1,
		created_at: "2023-01-02 10:30",
	},
];

const handleResponseSubmit = async (data) => {
	console.log(data);
};

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="App">
					<Routes>
						{/* <Route path="/" element={<Temp />} /> */}
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/temp" element={<Temp />} />
						<Route path="/product/:id" element={<ProductDetailsPage />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/admin" element={<ControlHub />} />
						<Route
							path="/admin/product_chat"
							element={
								<AdminMessagesTable
									messages={yourMessagesList}
									onSubmitResponse={handleResponseSubmit}
								/>
							}
						/>
						<Route path="/payment" element={<StripePaymentForm />} />
						<Route path="/payment-success" element={<PaymentSuccess />} />
					</Routes>
				</div>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
