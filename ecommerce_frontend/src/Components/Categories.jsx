import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories, getCategoriesByID } from '../api/category';
import ProductCard from './ProductCard';
import CategoryNestedList from './CategoryNestedList';
import CategoryList from './CategoryList';
import { getProducts } from '../api/product';

const Categories = ({ categoryItems = null, searchProductOfThisCategory }) => {

   return (
      <>
         <div className="categoryList flex flex-col justify-center align-center h-fit rounded-md shadow-lg px-4 bg-white m-4">
            <div className='bg-pile-300 text-center w-[80%] mx-auto  text-white text-2xl py-3 rounded-es-lg rounded-ee-lg'
               style={{ fontFamily: 'HelveticaNowMTText', fontWeight: 400 }}>
               {/* style={{ fontFamily: 'Roboto, sans-serif' }}> */}
               Category
            </div>
            <div className="cat-list mt-3 h-fit">
               {
                  categoryItems !== null && (
                     // <CategoryNestedList
                     //    items={categoryItems} parentIndex="root" searchProductOfThisCategory={searchProductOfThisCategory} />

                     <CategoryList
                        items={[{ id: 0, title: "All", description: "All Categories" }, ...categoryItems]} searchProductOfThisCategory={searchProductOfThisCategory} />
                  )
               }
            </div>
         </div>
      </>
   );
};

export default Categories;
