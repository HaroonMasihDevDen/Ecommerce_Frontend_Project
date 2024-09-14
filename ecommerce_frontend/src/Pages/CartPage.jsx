import React, { useEffect, useState } from 'react';
import CartTable from '../Components/CartTable';
import { get_user_cart_items, removeFromCart, validate_token } from '../api/cart';
import { checkIfUserAuthAndNavigate } from "../service/authUser";
import Navbar from '../Components/Navbar';

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
    alert("item deleted successfully");
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
    setSubtotal(calculateSubtotal());
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
        response.map((item) => item.image = "https://i.imgur.com/ohfEDZm.jpg");
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

  return (
    <>
      <Navbar></Navbar>
      <div className='flex justify-center'>
        <section className="container ms-12 flex-grow max-w-[1300px] border-b py-5 lg:flex lg:flex-row lg:py-10">
          {cartItems && cartItems.length > 0 && quantities.length > 0 ? (
            <CartTable
              products={cartItems}
              quantities={quantities}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ) : (
            <div>No Item</div>
          )}

          {/* Order summary */}
          <section className="mx-auto w-full px-4 md:max-w-[400px]">
            <div className="w-[110%]">
              <div className="border py-5 px-4 shadow-md">
                <p className="font-bold">ORDER SUMMARY</p>

                <div className="flex justify-between border-b py-5">
                  <p>Subtotal</p>
                  <p>Rs. {subtotal.toFixed(2)}</p> {/* Display updated subtotal */}
                </div>

                <div className="flex justify-between border-b py-5">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>

                <div className="flex justify-between border-b py-5">
                  <p className='pt-2'>Voucher(if any)</p>
                  <input type="text" onChange={(e) => setToken(e.target.value)} placeholder='enter token...' className='border rounded-sm ps-2' value={token} />
                  <button onClick={validate_voucher_token} className='bg-pile-700 text-white p-2 rounded-md' >Apply</button>
                </div>

                <div className="flex justify-between py-5 border-b">
                  <p>Discount</p>
                  <p>Rs. {discountAmount_f}</p>
                </div>

                <div className="flex justify-between py-5">
                  <p>Total</p>
                  <p>Rs. {totalAmount}</p>
                </div>

                <a href="checkout-address.html">
                  <button className="w-full bg-pile-700 px-5 py-2 text-white rounded-md">
                    Proceed to checkout
                  </button>
                </a>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default CartPage;
