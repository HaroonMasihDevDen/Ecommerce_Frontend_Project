import React, { useEffect, useState } from 'react';
import CartTable from '../Components/CartTable';
import { get_user_cart_items , removeFromCart } from '../api/cart';
import { checkIfUserAuthAndNavigate } from "../service/authUser";

const CartPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Assuming initialCartItems is your initial array

  // Initialize quantity state for each product
  const initialQuantities = cartItems.map((item) => item.quantity);
  const [quantities, setQuantities] = useState(initialQuantities);

  // Function to update quantity
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
  }, [quantities]);


  useEffect(() => {
    authenticateUserUsingToken();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialQuantities = cartItems.map((item) => item.quantity);
      setQuantities(initialQuantities);
    }
  },[cartItems]);

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

  return (
    <>
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        <CartTable
          product={cartItems}
          quantities={quantities}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />

        {/* Order summary */}
        <section className="mx-auto w-full px-4 md:max-w-[400px]">
          <div className="">
            <div className="border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER SUMMARY</p>
              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p> {/* Display updated subtotal */}
              </div>
              <div className="flex justify-between border-b py-5">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between py-5">
                <p>Total</p>
                <p>${subtotal.toFixed(2)}</p> {/* Display updated subtotal */}
              </div>
              <a href="checkout-address.html">
                <button className="w-full bg-violet-900 px-5 py-2 text-white  rounded-md">
                  Proceed to checkout
                </button>
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CartPage;
