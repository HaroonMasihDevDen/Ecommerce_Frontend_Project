import React from 'react';
import { useState } from 'react';


const CategoryCard = ({ items, parentIndex, searchProductOfThisCategory_callBack }) => {
   const initialStates = new Array(items.length).fill(false);
   const [dropdownStates, setDropdownStates] = useState(initialStates);

   const toggleDropdown = (index) => {
      setDropdownStates((prevStates) =>
         prevStates.map((state, i) => (i === index ? !state : state))
      );
   };
   const callbackFunction = (id) => {
      searchProductOfThisCategory_callBack(id);
   }

   return (
      <ul className="text-start flex flex-col">
         {items.length > 0 && items.map((item, index) => (
            <li key={item.id} className="text-start pt-2">
               <button
                  onClick={() => toggleDropdown(index)}
                  className="text-black flex justify-between px-2 text-start w-full capitalize font-light hover:bg-green-300 hover:rounded "
               >
                  <a className=''>
                     <button onClick={()=>callbackFunction(item.id)}>
                        {item.title}
                     </button>
                  </a>
                  {item.subItems && item.subItems.length > 0 && (
                     <span>
                        <i
                           className={`fa fa-angle-${dropdownStates[index] ? 'up' : 'down'} text-gray-400`}
                           aria-hidden="true"
                        ></i>
                     </span>
                  )}
               </button>
               {item.subItems && item.subItems.length > 0 && (
                  <ul
                     className={`ps-3 text-start flex flex-col gap-2 transition-all duration-300 ease-in-out ${dropdownStates[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                  >
                     {/* Render sub-items recursively */}
                     <CategoryCard items={item.subItems} parentIndex={`${parentIndex}-${index}`} searchProductOfThisCategory_callBack = {searchProductOfThisCategory_callBack} />
                  </ul>
               )}
            </li>
         ))}
      </ul>
   );
};

export default CategoryCard;
