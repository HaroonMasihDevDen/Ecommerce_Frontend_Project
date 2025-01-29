import React, { useState } from 'react';
import { applyFiltersOnProducts } from '../api/product';

export default function Filters({ categoryList = [], searchProductOfThisCategory, reAssignProductItems }) {
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [priceRange, setPriceRange] = useState([0, 500000]);

   const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

   const handleSizeChange = (size) => {
      if (selectedSizes.includes(size)) {
         setSelectedSizes(selectedSizes.filter((s) => s !== size));
      } else {
         setSelectedSizes([...selectedSizes, size]);
      }
   };

   const handleCategoryChange = (category) => {
      if (selectedCategories.includes(category)) {
         setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
         setSelectedCategories([...selectedCategories, category]);
      }
   };

   const handlePriceChangeLower = (e) => {
      setPriceRange([+e.target.value, priceRange[1]]);
   };

   const handlePriceChangeUpper = (e) => {
      setPriceRange([priceRange[0], +e.target.value]);
   };

   const resetFilters = () => {
      setSelectedSizes([]);
      setSelectedCategories([]);
      setPriceRange([100, 5000]);
   };

   const applyFilters = async () => {
      reAssignProductItems(await applyFiltersOnProducts(selectedSizes, priceRange[0], priceRange[1], selectedCategories));
   };

   return (
      <div className="p-6 mt-6 shadow-inner bg-gray-50 shadow-slate-300 rounded-lg">

         {/* Category Filter */}
         <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Category</h2>
            <div className="grid grid-cols-1 gap-2">
               {categoryList.map((category) => (
                  <label key={category.id} className="inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        value={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="accent-primary w-[20px] h-[20px]"
                     />
                     <span className="ml-2">{category.title}</span>
                  </label>
               ))}
            </div>
         </div>

         <hr className="border-gray-300 py-3" />

         {/* Sizes Filter */}
         <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Sizes</h2>
            <div className="grid grid-cols-1 gap-2">
               {sizes.map((size) => (
                  <label key={size} className="inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        value={size}
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="accent-primary w-[20px] h-[20px]"
                     />
                     <span className="ml-2">{size}</span>
                  </label>
               ))}
            </div>
         </div>

         <hr className="border-gray-300 py-3" />

         {/* Price Range Filter */}
         <div>
            <h2 className="font-bold text-lg mb-2">Price Range</h2>
            <div className="flex justify-between text-sm mb-4">
               <span>
                  <b>Price</b>
               </span>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex flex-col">
                  <input
                     type="number"
                     className="w-[5rem] border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                     min="1"
                     max="50000"
                     value={priceRange[0]}
                     onChange={handlePriceChangeLower}
                     placeholder="Min"
                  />
               </div>
               <div className="flex flex-col">
                  <input
                     type="number"
                     className="w-[5rem] border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                     min="1"
                     max="50000"
                     value={priceRange[1]}
                     onChange={handlePriceChangeUpper}
                     placeholder="Max"
                  />
               </div>
            </div>
         </div>

         <div className="flex justify-end gap-4 mt-4">
            <button
               className="bg-primary-light active:bg-primary text-white px-3 py-1 rounded transition-all"
               onClick={resetFilters}
            >
               Reset
            </button>
            <button
               className="bg-primary active:bg-primary-dark text-white px-3 py-1 rounded transition-all"
               onClick={applyFilters}
            >
               Apply
            </button>
         </div>
      </div>
   );
}
