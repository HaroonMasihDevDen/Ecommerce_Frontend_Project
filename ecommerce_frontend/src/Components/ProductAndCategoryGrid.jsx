import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories, getCategoriesByID } from '../api/category';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryNestedList';
import Categories from './Categories';
import { getProducts } from '../api/product';

const ProductAndCategoryGrid = () => {
   const [categoryItems, setCategoryItems] = useState(null);
   const [productItems, setProductItems] = useState(null);

   useEffect(() => {
      fetchCategories();
      fetchProducts();
   }, [0]);

   const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoryItems(categories);
      console.log("categoryItems:::", categories);
   };

   const fetchProducts = async () => {
      const products = await getProducts();
      console.log("products:::", products);

      setProductItems(products);
      console.log("categoryItems:::", products);
   };

   const searchProductOfThisCategory = async (catg_id) => {
      const products = await getCategoriesByID(catg_id);
      setProductItems(products);
   };

   return (
      <>

         <div className="flex w-[100%] h-[100%] px-6" >
            <div className="category w-[30%]">
               <Categories categoryItems={categoryItems} searchProductOfThisCategory={searchProductOfThisCategory} />
            </div>



            <div className="w-[70%]  h-[70rem]">
               <div className='bg-gray-50 p-4 flex flex-wrap justify-start gap-y-2 p-auto'>
                  {productItems !== null && productItems !== undefined && (
                     productItems.map(product => (
                        product.imageUrl = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
                        <ProductCard key={product.id} product={product} />
                     )))}
               </div>
            </div>

         </div >
      </>
   );
};

export default ProductAndCategoryGrid;
