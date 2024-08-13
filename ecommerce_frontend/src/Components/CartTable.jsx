import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const CartTable = ({
  product,
  quantities,
  updateQuantity,
  removeItem,
}) => {
  return (
    <section className="hidden h-[600px] w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
      {/* Desktop cart table */}
      <table className="table-fixed">
        <thead className="h-16 bg-neutral-100">
          <tr>
            <th>ITEM</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {product.map((x, index) => {
            return (
              <tr className="h-[100px] border-b" key={index}>
                <td className="align-middle">
                  {/* Render product details from the prop */}
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src={x.image}
                      alt="bedroom image"
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">{x.name}</p>
                      <p className="text-sm text-gray-400">Size: {x.size}</p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center">${x.price}</td>
                {/* Additional code for quantity and total remains unchanged */}
                <td className="align-middle">
                  <div className="flex items-center justify-center">
                    <button
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                      onClick={() =>
                        updateQuantity(index, quantities[index] - 1)
                      }
                    >
                      −
                    </button>
                    <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                      {quantities[index]}
                    </div>
                    <button
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                      onClick={() =>
                        updateQuantity(
                          index,
                          Math.max(1, quantities[index] + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="mx-auto text-center">Rs. {x.price * quantities[index]}</td>
                <td className="align-middle">
                  <FaTrashAlt
                    onClick={() => removeItem(index)}
                    className="m-0 h-5 w-5 cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default CartTable;
