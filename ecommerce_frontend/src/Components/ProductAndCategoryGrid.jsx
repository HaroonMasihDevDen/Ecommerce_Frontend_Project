import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories } from '../api/category';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';

// Recursive Dropdown Component


const productItems = [
   {
      id: 1,
      name: 'Italian Cotton Shirts',
      price: 599,
      description: 'This is a high-quality Italian cotton shirt.',
      discountPercentage: 20,
      imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
   },
   {
      id: 2,
      name: 'Summer Dress',
      price: 799,
      description: 'A beautiful summer dress for all occasions.',
      discountPercentage: 15,
      imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
   },
   {
      id: 3,
      name: 'Winter Jacket',
      price: 1499,
      description: 'Stay warm with this stylish winter jacket.',
      discountPercentage: 10,
      imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
   },
   // Add more products as needed
];



const ProductAndCategoryGrid = () => {
   // Sample menu items data with more nested sub-categories
   const categoryItems_dumy = [
      {
         id: 1,
         title: 'Summer',
         subItems: [
            {
               id: 2,
               title: 'tops',
               subItems: [
                  { id: 3, title: 'Aaaa', subItems: [{ id: 4, title: 'Aaaa1', subItems: [] }] },
                  { id: 5, title: 'bbbb', subItems: [] },
                  { id: 6, title: 'cccc', subItems: [] },
               ],
            },
            { id: 7, title: 'bottoms', subItems: [] },
            {
               id: 8,
               title: 'others',
               subItems: [
                  { id: 9, title: 'accessories', subItems: [] },
                  { id: 10, title: 'footwear', subItems: [] },
               ],
            },
         ],
      },
      {
         id: 11,
         title: 'Winter',
         subItems: [
            { id: 12, title: 'tops winter', subItems: [] },
            { id: 13, title: 'bottoms winter', subItems: [] },
            { id: 14, title: 'others', subItems: [] },
         ],
      },
      {
         id: 15,
         title: 'Men',
         subItems: [
            { id: 16, title: 'tops', subItems: [] },
            { id: 17, title: 'bottoms', subItems: [] },
            { id: 18, title: 'others men', subItems: [] },
         ],
      },
      {
         id: 19,
         title: 'kids',
         subItems: [
            { id: 20, title: 'tops', subItems: [] },
            { id: 21, title: 'bottoms', subItems: [] },
            { id: 22, title: 'others men', subItems: [] },
         ],
      },
      // Add more items as needed
   ];
   const [categoryItems, setCategoryItems] = useState(null);

   useEffect(() => {
      fetchCategories();
   }, [0]);

   const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoryItems(categories);
      console.log("categoryItems:::", categories);
      console.log("categoryItems_dumy:::", categoryItems_dumy);
   };

   return (
      <div className="flex w-[100%] h-fit bg-gray-100 px-6">
         <div className="category w-[20%]">
            <div className="categoryList rounded-md shadow-lg px-4 py-2 h-[20rem] bg-white m-4">
               <div className='cat-header m-2 text-center'>CATEGORY</div>
               <div className="cat-list mt-2">
                  {
                     categoryItems !== null && (
                        <CategoryCard items={categoryItems} parentIndex="root" />
                     )
                  }
               </div>
            </div>
         </div>

         {/* <div className="product-main flex w-[80%] bg-gray-50 p-4">
            <div className="my_item w-[20rem] h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
               <a href="#" className='relative'>
                  <img className="rounded-t-lg" src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb" alt="product image" />
                  <span className="absolute top-2 end-2 p-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
                     20% Discount
                  </span>
               </a>
               <div className="px-5 pb-5">
                  <span className='flex justify-between '>

                     <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">italian cotton</h5>
                     </a>
                  </span>

                  <div className="flex items-center mt-2.5 mb-5">
                     <div className="">
                        <p>
                           this is the description of this product
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-bold text-gray-900">Rs. 599</span>
                     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
               </div>
            </div>

            <div className="item w-[20rem] h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
               <a href="#" className='relative'>
                  <img className="rounded-t-lg" src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb" alt="product image" />
                  <span className="absolute top-2 end-2 p-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
                     20% Discount
                  </span>
               </a>
               <div className="px-5 pb-5">
                  <span className='flex justify-between '>

                     <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">italian cotton</h5>
                     </a>
                  </span>

                  <div className="flex items-center mt-2.5 mb-5">
                     <div className="">
                        <p>
                           this is the description of this product
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-bold text-gray-900">Rs. 599</span>
                     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
               </div>
            </div>

            <div className="item w-[20rem] h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
               <a href="#" className='relative'>
                  <img className="rounded-t-lg" src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb" alt="product image" />
                  <span className="absolute top-2 end-2 p-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded dark:bg-blue-200 dark:text-blue-800">
                     20% Discount
                  </span>
               </a>
               <div className="px-5 pb-5">
                  <span className='flex justify-between '>

                     <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize">italian cotton</h5>
                     </a>
                  </span>

                  <div className="flex items-center mt-2.5 mb-5">
                     <div className="">
                        <p>
                           this is the description of this product
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-bold text-gray-900">Rs. 599</span>
                     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
               </div>
            </div>

           

         </div> */}

         <div className="product-main flex w-[80%] bg-gray-50 p-4">
            {productItems.map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
         </div>

      </div>
   );
};

export default ProductAndCategoryGrid;
