import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories , getCategoriesByID } from '../api/category';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import { getProducts } from '../api/product';

// Recursive Dropdown Component


// const productItems = [
//    {
//       id: 1,
//       name: 'Italian Cotton Shirts',
//       price: 599,
//       description: 'This is a high-quality Italian cotton shirt.',
//       discountPercentage: 20,
//       imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
//    },
//    {
//       id: 2,
//       name: 'Summer Dress',
//       price: 799,
//       description: 'A beautiful summer dress for all occasions.',
//       discountPercentage: 15,
//       imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
//    },
//    {
//       id: 3,
//       name: 'Winter Jacket',
//       price: 1499,
//       description: 'Stay warm with this stylish winter jacket.',
//       discountPercentage: 10,
//       imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
//    },
//    // Add more products as needed
// ];



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
   const [productItems, setProductItems] = useState(null);

   useEffect(() => {
      fetchCategories();
      fetchProducts();
   }, [0]);

   const fetchCategories = async() => {
      const categories = await   getCategories();
      setCategoryItems(categories);
      console.log("categoryItems:::", categories);
   };

   const fetchProducts = async() => {
      const products =await getProducts();
      console.log("products:::", products);

      setProductItems(products);
      console.log("categoryItems:::", products);
   };

   const searchProductOfThisCategory = async (catg_id) => {
      const products = await getCategoriesByID(catg_id);
      setProductItems(products);    
   };

   return (
      <div className="flex w-[100%] h-[100%] px-6">
         <div className="category w-[20%]">
            <div className="categoryList rounded-md shadow-lg px-4 py-2 h-[20rem] bg-white m-4">
               <div className='cat-header m-2 text-center'>CATEGORY</div>
               <div className="cat-list mt-2">
                  {
                     categoryItems !== null && (
                        <CategoryCard  items={categoryItems} parentIndex="root" searchProductOfThisCategory_callBack= {searchProductOfThisCategory} />
                     )
                  }
               </div>
            </div>
         </div>

        

         <div className="w-[80%]  h-[70rem]">
            <div className='bg-gray-50 p-4 flex flex-wrap justify-around gap-y-2 p-auto'>
               {productItems !== null && productItems !== undefined && (
                  productItems.map(product => (
                     product.imageUrl = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
                     <ProductCard key={product.id} product={product} />
                  )))}
            </div>
         </div>

      </div>
   );
};

export default ProductAndCategoryGrid;
