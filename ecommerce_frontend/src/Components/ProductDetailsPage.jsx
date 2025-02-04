import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProductDetails } from '../api/product';
import Cookies from 'js-cookie';
import { validateToken } from '../api/auth';
import { addToCart } from '../api/cart';
import { checkIfUserAuthAndNavigate } from '../service/authUser';
import Navbar from './Navbar';
import ProductChat from './ProductChat';


const ProductDetailsPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(undefined);
    const { id: productId } = useParams();
    const [selectedSize, setSelectedSize] = useState(-1);
    const [selectedSizeID, setSelectedSizeID] = useState(-1);
    const [price, setprice] = useState(0);
    const location = useLocation();
    const productFromNav = location.state?.product;
    const [currentPrevImageIndex, setCurrentPrevImageIndex] = useState(0);

    useEffect(() => {
        if (productFromNav) {
            setProduct(productFromNav);
            if (productFromNav.sizes && productFromNav.sizes.length > 0) {
                setprice(productFromNav.sizes[0].price);
                setSelectedSizeID(productFromNav.sizes[0].size_id);
            }
        } else {
            fetchProductDetails(productId);
        }
    }, [productId, productFromNav]);

    const fetchProductDetails = async (productId) => {
        const response = await getProductDetails(productId);
        setProduct(response);
        if (response && response.sizes && response.sizes.length > 0) {
            setprice(response.sizes[0].price);
            setSelectedSizeID(response.sizes[0].size_id);
        }
    };

    const increamentQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreamentQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleSizeChange = (event) => {
        const selectedValue = event.target.value;
        for (let i = 0; i < product.sizes.length; i++) {
            if (product.sizes[i].size_title == selectedValue) {
                setprice(product.sizes[i].price);
                setSelectedSizeID(product.sizes[i].size_id);
                break;
            }
        }
        setSelectedSize(selectedValue);
    };

    const addProductToCart = async (product_id) => {
        const userAuth = await checkIfUserAuthAndNavigate();
        if (userAuth) {
            const response = await addToCart(product_id, selectedSizeID, quantity);
            console.log("response for adding product to cart", response);
            if (response && response.status === 200) {
                alert("Product added to cart successfully");
            } else {
                alert("Failed to add product to cart");
            }
        }
    };


    return (
        <>
            <Navbar />
            {product != [] && product != undefined && (
                <div>
                    <section className="py-5">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap -mx-4 justify-center">
                                <aside className="px-4 mb-6 lg:mb-0">
                                    <div className="mb-3 flex justify-center">
                                        <img
                                            className="w-[25rem] h-[30rem] object-cover rounded-lg"
                                            src={product.base64_images[currentPrevImageIndex]}
                                            alt="Main"
                                        />
                                    </div>
                                    <div className="flex justify-center mb-3 cursor-pointer">
                                        {product.base64_images.map((src, index) => (
                                            <img
                                                key={index}
                                                className={`w-20 h-20 rounded-lg m-1 object-cover ${currentPrevImageIndex === index ? 'border-4 border-blue-500' : ''}`}
                                                src={src}
                                                alt={`Thumbnail ${index}`}
                                                onClick={() => setCurrentPrevImageIndex(index)}
                                            />
                                        ))}
                                    </div>
                                </aside>
                                <main className="lg:w-1/2 px-4 pt-[3rem]">
                                    <div className="lg:pl-3">
                                        <h4 className="text-2xl font-bold text-gray-900">
                                            {product.name}
                                        </h4>
                                        <br />
                                        <div className='flex col-2'>
                                            <div className="mb-3">
                                                <span className="text-2xl">Rs. {price}</span>
                                            </div>

                                            <div className='mb-3'>
                                                <span className="ms-4 text-green-600 font-bold">In stock</span>
                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <div className="flex flex-wrap mb-4">
                                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                                <label className="block mb-2">Size</label>
                                                <select className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                                    onChange={handleSizeChange}
                                                    value={selectedSize || ""}
                                                >
                                                    {product.sizes !== null && product.sizes.map((size, index) => (
                                                        <option key={index} value={size.size_title} >
                                                            {size.size_title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="ms-4 w-full md:w-1/3 mb-4 md:mb-0">
                                                <label className="block mb-2">Quantity</label>
                                                <div className="py-0.5 border border-gray-300 rounded-lg overflow-hidden flex w-fit">
                                                    <button onClick={decreamentQuantity} className="bg-white border-r border-gray-300 px-4 py-2 flex" type="button">
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="text-center border-none w-20"
                                                        value={quantity}
                                                        readOnly={true}
                                                    />
                                                    <button onClick={increamentQuantity} className="bg-white border-l border-gray-300 px-4 py-2 flex" type="button">
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">

                                            {/* <a href="#" className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md inline-block mr-2">Buy now</a> */}
                                            <a onClick={() => addProductToCart(product.id)} className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md inline-block mr-2">
                                                <i className="fas fa-shopping-basket mr-1"></i> Add to cart
                                            </a>

                                        </div>

                                        <hr className='my-4' />
                                        <br />
                                        <div className='description flex flex-col justify-start items-start'>
                                            <p className='font-bold border-b-2'>Description</p>

                                            <p className='text-start pt-3'>
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </section>

                    {/* Additional Info Section */}
                    {/* <section className="bg-gray-100 border-t py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap -mx-4">

                                <div className="lg:w-1/3 px-4">
                                    <div className="border rounded-lg bg-white p-4">
                                        <h5 className="text-xl font-bold">You might also like</h5>
                                        <div className="flex flex-wrap">
                                            {[...Array(4)].map((_, i) => (
                                                <p>Hello world</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    <section>
                        <div className=''>
                            <ProductChat productId={productId} user_id={18} chats={product.chats} />
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};
export default ProductDetailsPage;