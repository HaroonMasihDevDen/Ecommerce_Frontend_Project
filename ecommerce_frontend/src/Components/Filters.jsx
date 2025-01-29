import React, { useState } from 'react';
import { applyFiltersOnProducts } from '../api/product';

export default function Filters({ categoryList = [], reAssignProductItems }) {
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [minPrice, setMinPrice] = useState();
   const [maxPrice, setMaxPrice] = useState();

   const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

   const handleSizeChange = (size) => {
      setSelectedSizes((prevSizes) =>
         prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
      );
   };

   const handleCategoryChange = (category) => {
      setSelectedCategories((prevCategories) =>
         prevCategories.includes(category) ? prevCategories.filter((c) => c !== category) : [...prevCategories, category]
      );
   };

   const handlePriceChangeLower = (e) => {
      const value = Number(e.target.value);
      if (value == 0) {
         setMinPrice();
      }
      else {
         setMinPrice(Number(e.target.value));
      }
   };

   const handlePriceChangeUpper = (e) => {
      const value = Number(e.target.value);
      if (value == 0) {
         setMaxPrice();
      }
      else {
         setMaxPrice(Number(e.target.value));
      }
   };

   const resetFilters = async () => {
      setSelectedSizes([]);
      setSelectedCategories([]);
      setMinPrice();
      setMaxPrice();
      reAssignProductItems(await applyFiltersOnProducts(selectedSizes, minPrice, maxPrice, selectedCategories));

   };

   const applyFilters = async () => {
      reAssignProductItems(await applyFiltersOnProducts(selectedSizes, minPrice, maxPrice, selectedCategories));
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
            <div className="flex items-center gap-2">
               <div className="flex flex-col">
                  <input
                     type="number"
                     className="w-[5rem] border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                     min="0"
                     max="50000"
                     value={minPrice}
                     onChange={handlePriceChangeLower}
                     placeholder="Min"
                  />
               </div>
               <div className="flex flex-col">
                  <input
                     type="number"
                     className="w-[5rem] border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                     min="0"
                     max="50000"
                     value={maxPrice}
                     onChange={handlePriceChangeUpper}
                     placeholder="Max"
                  />
               </div>
            </div>
         </div>

         <div className="flex justify-end gap-4 mt-4">
            <button className="bg-primary-light active:bg-primary text-white px-3 py-1 rounded transition-all" onClick={resetFilters}>
               Reset
            </button>
            <button className="bg-primary active:bg-primary-dark text-white px-3 py-1 rounded transition-all" onClick={applyFilters}>
               Apply
            </button>
         </div>
      </div>
   );
}
