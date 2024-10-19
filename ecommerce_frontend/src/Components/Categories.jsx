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
         {categoryItems !== null && (
            <CategoryList
               items={[{ id: 0, title: "All", description: "All Categories" }, ...categoryItems]} searchProductOfThisCategory={searchProductOfThisCategory} />
         )
         }
      </>
   );
};

export default Categories;
