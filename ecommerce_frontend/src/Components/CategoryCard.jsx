import React from 'react';
import { useState } from 'react';


const CategoryDropdown = ({ items, parentIndex }) => {
  const initialStates = new Array(items.length).fill(false);
  const [dropdownStates, setDropdownStates] = useState(initialStates);

  const toggleDropdown = (index) => {
     setDropdownStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
     );
  };

  return (
     <ul className="text-start flex flex-col">
        {items.map((item, index) => (
           <li key={item.id} className="text-start pt-2">
              <button
                 onClick={() => toggleDropdown(index)}
                 className="text-black flex justify-between text-start w-full capitalize font-light"
              >
                 <a href="#">{item.title}</a>
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
                    <CategoryDropdown items={item.subItems} parentIndex={`${parentIndex}-${index}`} />
                 </ul>
              )}
           </li>
        ))}
     </ul>
  );
};

export default CategoryDropdown;
