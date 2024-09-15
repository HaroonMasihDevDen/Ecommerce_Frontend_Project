import React from 'react';

const ProductCard = ({ product }) => {
    function showProductDetails(id) {
        window.location = `/product/${id}`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
            <div className='h-[20rem] w-80'>

                <a href="#" className="relative h-[100%]">
                    <img className="rounded-t-lg h-full" src={product.imageUrl} alt={product.name} />
                    {product.discountPercentage > 0 && (
                        <span className="absolute top-2 right-2 p-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
                            {product.discountPercentage}% Discount
                        </span>
                    )}
                </a>
            </div>
            <div className="px-5 pb-5 align-top">
                <div className="flex justify-between cursor-pointer" onClick={() => showProductDetails(product.id)}>
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">{product.name}</h5>
                    </a>
                </div>
                <div className="mt-2.5 mb-5">
                    <p>{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Rs. {product.price}</span>
                    <a onClick={() => showProductDetails(product.id)} className="text-white cursor-pointer bg-pile-500 hover:bg-pile-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View Product
                    </a>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;
