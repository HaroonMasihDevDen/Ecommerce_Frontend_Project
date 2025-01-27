import React from 'react';

const ProductCard = ({ product }) => {
    function showProductDetails(id) {
        window.location = `/product/${id}`;
    };

    return (
        <div className="w-[20rem] border dark:bg-gray-800 dark:border-gray-700 m-[4px] mt-8">
            <a onClick={() => showProductDetails(product.id)} className="text-white cursor-pointer">
                <div className='h-[23rem] w-full'>

                    <a href="#" className="relative h-[100%]">
                        {/* <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} /> */}
                        <img className="h-full w-full object-cover" src={`https://picsum.photos/200/300?random=1`} alt={product.name} />
                        {product.discountPercentage > 0 && (
                            <span className="absolute top-2 right-2 p-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
                                {product.discountPercentage}% Discount
                            </span>
                        )}
                    </a>
                </div>
                <div className="px-5 pt-3 align-top">
                    <div className="flex justify-between cursor-pointer" onClick={() => showProductDetails(product.id)}>
                        <a href="#">
                            <h5 className="text-lg font-semibold tracking-tight text-gray-900 capitalize">{product.name}</h5>
                        </a>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-md font-bold text-gray-900">Rs. {product.price}</span>
                    </div>
                    <div className="mt-2.5 mb-3">
                        <p className='text-black flex justify-start text-sm'>{product.description}</p>
                    </div>

                </div>
            </a >
        </div>
    )
};

export default ProductCard;
