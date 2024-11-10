import React, { useState } from 'react';
import { applyFiltersOnProducts } from '../api/product';
const Filters = () => {
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [priceRange, setPriceRange] = useState([10, 100]);

   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

   // Handle size selection
   const handleSizeChange = (size) => {

      const index = selectedSizes.indexOf(size);
      if (index === -1) {
         setSelectedSizes([...selectedSizes, size]);
      } else {
         setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
      console.log(selectedSizes);
   };

   // Handle price range change
   const handlePriceChangeLower = (e) => {
      setPriceRange([+e.target.value, priceRange[1]]);
   };

   const handlePriceChangeUpper = (e) => {
      setPriceRange([priceRange[0], +e.target.value]);
   };

   const resetFilters = () => {
      setPriceRange([100, 5000]);
      setSelectedSizes([]);
   }

   const applyFilters = () => {
      applyFiltersOnProducts(selectedSizes, priceRange[0], priceRange[1]);
   }

   return (
      <div className="p-6 mt-6  shadow-inner shadow-slate-300 bg-gray-50">
         {/* Sizes Filter */}
         <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Sizes</h2>
            <div className="grid grid-cols-2 gap-2">
               {sizes.map((size) => (
                  <label key={size} className="inline-flex items-center">
                     <button
                        type="button"
                        className={`${selectedSizes.includes(size) ? 'bg-pile-50' : 'bg-pile-300'} px-3 py-1 rounded-md`}
                        style={{ accentColor: 'green' }}
                        onClick={() => handleSizeChange(size)}

                     >
                        {size}
                     </button>
                     {/* <span className="ml-2">{size}</span> */}
                  </label>
               ))}
            </div>
         </div>

         <hr className='border-gray-300 py-3' />
         <div>
            <h2 className="font-bold text-lg mb-2">Price Range</h2>
            <div className="flex justify-between text-sm mb-4">
               <span>Rs. {priceRange[0]}</span>
               <span>Rs. {priceRange[1]}</span>
            </div>
            <div className="flex items-center gap-2">
               <div className='flex flex-col'>

                  <input
                     type="range"
                     className="w-full"
                     min="0"
                     max="500"
                     value={priceRange[0]}
                     onChange={handlePriceChangeLower}
                  />
                  <label htmlFor="">Min</label>
               </div>
               <div className='flex flex-col'>

                  <input
                     type="range"
                     className="w-full"
                     min="500"
                     max="50000"
                     value={priceRange[1]}
                     onChange={handlePriceChangeUpper}
                  />
                  <label htmlFor="">Max</label>
               </div>
            </div>

         </div>
         <div className='flex justify-end gap-4 mt-4'>
            <button
               className="bg-green-500 text-white px-3 py-1 rounded w-fit"
               onClick={resetFilters}
            >
               Reset
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded w-fit"
               onClick={applyFilters}
            >
               Apply
            </button>
         </div>
      </div>
   );
};

export default Filters;

