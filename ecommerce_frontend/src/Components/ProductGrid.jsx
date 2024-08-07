import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories } from '../api/category';

// Recursive Dropdown Component
const Dropdown = ({ items, parentIndex }) => {
   const initialStates = new Array(items.length).fill(false);
   const [dropdownStates, setDropdownStates] = useState(initialStates);

   const toggleDropdown = (index) => {
      setDropdownStates((prevStates) =>
         prevStates.map((state, i) => (i === index ? !state : state))
      );
   };

   return (
      <ul className="text-start flex flex-col">
         {items.map((item, index) => (
            <li key={item.id} className="text-start pt-2">
               <button
                  onClick={() => toggleDropdown(index)}
                  className="text-black flex justify-between text-start w-full capitalize font-light"
               >
                  <a href="#">{item.title}</a>
                  {item.subItems && item.subItems.length > 0 && (
                     <span>
                        <i
                           className={`fa fa-angle-${dropdownStates[index] ? 'up' : 'down'} text-gray-400`}
                           aria-hidden="true"
                        ></i>
                     </span>
                  )}
               </button>
               {item.subItems && item.subItems.length > 0 && (
                  <ul
                     className={`ps-3 text-start flex flex-col gap-2 transition-all duration-300 ease-in-out ${dropdownStates[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                  >
                     {/* Render sub-items recursively */}
                     <Dropdown items={item.subItems} parentIndex={`${parentIndex}-${index}`} />
                  </ul>
               )}
            </li>
         ))}
      </ul>
   );
};

const ProductGrid = () => {
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
   },[0]);

   const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoryItems(categories);
      console.log("categoryItems:::",categories);
      console.log("categoryItems_dumy:::",categoryItems_dumy);
   };

   return (
      <div className="flex w-[100%] h-fit bg-gray-100 px-6">
         <div className="category w-[20%]">
            <div className="categoryList rounded-md shadow-lg px-4 py-2 h-[20rem] bg-white m-4">
               <div className='cat-header m-2 text-center'>CATEGORY</div>
               <div className="cat-list mt-2">
                  {
                     categoryItems !== null && (
                        <Dropdown items={categoryItems} parentIndex="root" />
                     )
                  }
               </div>
            </div>
         </div>

         <div className="product-main flex w-[80%] bg-red-300 p-4">
            <div className="w-[20rem] h-[20rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
               <a href="#">
                  <img className="p-8 rounded-t-lg" src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb" alt="product image" />
               </a>
               <div className="px-5 pb-5">
                  <a href="#">
                     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                     <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {[...Array(4)].map((_, i) => (
                           <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                           </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                     </div>
                     <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
               </div>
            </div>
            {/* Repeat similar product cards as needed */}
         </div>
      </div>
   );
};

export default ProductGrid;
