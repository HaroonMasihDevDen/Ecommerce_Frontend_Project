import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCategories, getCategoriesByID } from '../api/category';
import ProductCard from './ProductCard';
import CategoryNestedList from './CategoryNestedList';
import { getProducts } from '../api/product';

const Categories = ({ categoryItems = null, searchProductOfThisCategory }) => {

   return (
      <>
         <div className="categoryList flex flex-col justify-center align-center h-fit rounded-md shadow-lg px-4 bg-white m-4">
            <div className='bg-pile-100 text-center w-[80%] mx-auto  text-white font-bold py-3 rounded-es-lg rounded-ee-lg'
               style={{ fontFamily: 'Roboto, sans-serif' }}>
               CATEGORY
            </div>
            <div className="cat-list mt-8 h-fit">
               {
                  categoryItems !== null && (
                     <CategoryNestedList
                        items={categoryItems} parentIndex="root" searchProductOfThisCategory={searchProductOfThisCategory} />
                  )
               }
            </div>
         </div>
      </>
   );
};

export default Categories;
