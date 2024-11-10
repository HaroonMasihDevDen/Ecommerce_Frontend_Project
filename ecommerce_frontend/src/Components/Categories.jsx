import React, { useEffect, useState } from 'react';

function CategoryList({ categoryItems = [], searchProductOfThisCategory }) {
   // State to keep track of which items are checked
   const [checkedItems, setCheckedItems] = useState({ 0: true });

   const callbackFunction = (ids) => {
      searchProductOfThisCategory(ids);
   };

   const handleToggle = (id) => {
      setCheckedItems((prev) => ({
         ...prev, [id]: !prev[id]
      }));
   };

   useEffect(() => {
      let catg_ids = Object.keys(checkedItems).filter((key) => checkedItems[key]);
      if (catg_ids.length == 0) {
         setCheckedItems({ 0: true });
         callbackFunction([0]);
         return;
      }
      callbackFunction(catg_ids);
   }, [checkedItems]);

   return (
      <>
         {/* <div className='shadow-inner shadow-slate-300 bg-gray-100 p-6'>
            <div>
               <h2 className='font-bold text-md mb-2'>Category</h2>
            </div>
            <div>
               <ul className="text-start flex flex-col w-full">
                  {categoryItems.length > 0 && categoryItems.map((item, index) => (
                     <li
                        key={item.id}
                        className="text-start ps-4 pt-2 w-full flex justify-center align-center"
                        onClick={() => handleToggle(item.id)}
                     >
                        <button className='w-full mr-8 justify-center grid grid-cols-4 gap-4 '>

                           <span className='text-right'>
                              <input
                                 type="radio"
                                 className='w-4 h-4'
                                 style={{ accentColor: 'green' }}
                                 checked={checkedItems[item.id] || false}
                                 readOnly />
                           </span>
                           <span className='text-left'>
                              <h3
                                 className='text-xl capitalize'
                                 // style={{ fontFamily: 'Open Sans', fontWeight: 500 }}
                                 title={item.description}
                              >
                                 {item.title}
                              </h3>
                           </span>
                        </button>
                     </li>
                  ))}
               </ul>
            </div>
         </div> */}
      </>
   );
}

export default CategoryList;
