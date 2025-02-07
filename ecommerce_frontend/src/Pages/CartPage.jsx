import React, { useEffect, useState } from 'react';
import CartTable from '../Components/CartTable';
import { get_user_cart_items, removeFromCart, validate_token } from '../api/cart';
import { checkIfUserAuthAndNavigate } from "../service/authUser";
import Navbar from '../Components/Navbar';
import StripePaymentForm from '../ComponentPayment/StripePaymentForm';
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Truck, Tag, CreditCard } from 'lucide-react';



const CartPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const initialQuantities = cartItems.map((item) => item.quantity);
  const [quantities, setQuantities] = useState(initialQuantities);
  const [token, setToken] = useState("");
  const [capAmount, setCapAmount] = useState(-1);
  const [discountType, setDiscountType] = useState(null);
  const [discountValue_b, setDiscountValue_b] = useState(-1);
  const [discountAmount_f, setDiscountAmount_frontend] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      return;
    }
    setQuantities(
      quantities.map((qty, i) => (i === index ? newQuantity : qty))
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item, index) => {
      return total + item.price * quantities[index];
    }, 0);
  };

  const removeItem = (index) => {
    const newProductItems = [...cartItems];
    const newQuantities = [...quantities];

    removeItemFromCart(cartItems[index].id);
    newProductItems.splice(index, 1);
    newQuantities.splice(index, 1);

    setCartItems(newProductItems);
    console.log(newProductItems);
    window.location.reload();
    setQuantities(newQuantities);
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const res = await removeFromCart(itemId);
      console.log("response for removing item from cart", res);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  useEffect(() => {
    const subtotal = calculateSubtotal();
    setSubtotal(subtotal);
    setDiscountAmount_frontend(calculateDiscountAmount());
    setTotalAmount(subtotal - discountAmount_f);
  }, [quantities, discountValue_b, discountAmount_f]);

  useEffect(() => {
    authenticateUserUsingToken();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialQuantities = cartItems.map((item) => item.quantity);
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  const authenticateUserUsingToken = async () => {
    const userAuth = await checkIfUserAuthAndNavigate();
    if (userAuth) {
      fetchCartItems();
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await get_user_cart_items();
      console.log("response for get cart items", response);
      if (response) {
        // response.map((item) => item.image = "https://i.imgur.com/ohfEDZm.jpg");
        setCartItems(response);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const validate_voucher_token = async () => {
    setCapAmount(0);
    setDiscountValue_b(0);
    const applied_type = "Order";
    const response = await validate_token(token, applied_type);
    if (response.error) {
      alert("Invalid voucher token");
      return;
    }
    console.log("response for validate VOUCHER", response);
    setCapAmount(response.cap_amount);
    setDiscountType(response.discount_type);
    setDiscountValue_b(response.discount_value);
  };

  const calculateDiscountAmount = () => {
    const sub_total = calculateSubtotal();
    let discount = 0;
    if (discountType === "Percentage") {
      discount = (sub_total * discountValue_b / 100);
      if (discount > capAmount) {
        discount = capAmount;
      }
    }
    else if (discountType === "Amount") {
      discount = discountValue_b;
      if (discount > capAmount) {
        discount = capAmount;
      }
    }
    // alert("new discount amount set");
    // alert(discount);
    return discount;
  };

  const handlePaymentCheckout = () => {
    if (totalAmount > 0) {
      navigate("/payment", {
        state: {
          discount: discountAmount_f,
          total: totalAmount,
          subtotal: subtotal,
        },
      });
    } else {
      alert("Total amount must be greater than zero to proceed.");
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto bg-white">
        <section className="px-4 py-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Cart Items Section */}
            <div className="w-full shadow-2xl rounded-lg">
              {cartItems.length !== 0 && (
                <CartTable
                  products={cartItems}
                  quantities={quantities}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              )}
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:max-w-md">
              <div className="bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                  {/* Subtotal */}
                  <div className="flex justify-between py-4 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  {/* Voucher Input */}
                  <div className="py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter voucher code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={validate_voucher_token}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Discount */}
                  <div className="flex justify-between py-4 border-b border-gray-200">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">Rs. {discountAmount_f}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 mb-6">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-gray-800">
                      Rs. {totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handlePaymentCheckout}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold
                           hover:bg-blue-700 transition-colors duration-200
                           flex items-center justify-center gap-2
                           shadow-lg shadow-blue-500/30"
                  >
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Best Price</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CartPage;
