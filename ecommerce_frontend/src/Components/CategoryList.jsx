import React, { useEffect, useState } from 'react';

const CategoryList = ({ items = [], searchProductOfThisCategory }) => {
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
   }, [checkedItems])

   return (
      <ul className="text-start flex flex-col"
         // style={{ fontFamily: 'HelveticaNowMTText', fontWeight: 400 }}>
         style={{ fontFamily: 'Helvetica', fontWeight: 400 }}>
         {items.length > 0 && items.map((item, index) => (
            <li
               key={item.id}
               className="text-start ps-4 pt-2 w-full justify-center align-center"
               onClick={() => handleToggle(item.id)}
            >
               <button className='w-full flex justify-between'>
                  <div>
                     <h3
                        className='text-xl capitalize'
                        title={item.description}
                     >
                        {item.title}
                     </h3>
                  </div>
                  <div>
                     <span>
                        <input
                           type="checkbox"
                           className='w-4 h-4'
                           checked={checkedItems[item.id] || false}
                           readOnly
                        />
                     </span>
                  </div>
               </button>
            </li>
         ))}
      </ul>
   );
};

export default CategoryList;
