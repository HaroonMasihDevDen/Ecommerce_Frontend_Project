import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { validate_token } from '../api/cart';


const CartTable = ({
  products,
  quantities,
  updateQuantity,
  removeItem,
}) => {
  const [productList, setProductList] = useState(products || []);
  const [token, setToken] = useState("");
  const [capAmount, setCapAmount] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [discountValue_backend, setDiscountValue_backend] = useState(-1);
  const [discountAmount_f, setDiscountAmount_f] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [indexOfProductForVoucher, setIndexOfProductForVoucher] = useState(-1);
  const [totalPriceForProductAfterVouchrApply, setTotalPriceForProductAfterVouchrApply] = useState(0);
  const [totalAmountForEachProduct, setTotalAmountForEachProduct] = useState(productList.map((product, index) => product.price * quantities[index]));
  const [productTokenValid, setProductTokenValid] = useState(false);

  const validate_voucher_token = async () => {
    setProductTokenValid(false);
    setCapAmount(0);
    setDiscountValue_backend(0);
    const applied_type = "Product";
    const response = await validate_token(token, applied_type);
    if (response.error) {
      alert("Invalid voucher token");
      return;
    }
    console.log("response for validate VOUCHER", response);
    setProductTokenValid(true);
    setCapAmount(response.cap_amount);
    setDiscountType(response.discount_type);
    setDiscountValue_backend(response.discount_value);
  };

  const calculateDiscountAmount = () => {
    if (capAmount == 0) {
      return 0;
    }
    if (indexOfProductForVoucher === -1) {
      return 0;
    }
    let discount = 0;
    try {
      const sub_total = productList[indexOfProductForVoucher]?.price * quantities[indexOfProductForVoucher]
      if (discountType === "Percentage") {
        discount = (sub_total * discountValue_backend / 100);
        if (discount > capAmount) {
          discount = capAmount;
        }
      }
      else if (discountType === "Amount") {
        discount = discountValue_backend;
        if (discount > capAmount) {
          discount = capAmount;
        }
      }
    }
    catch (error) {
      alert("index: " + indexOfProductForVoucher);
    }
    return discount;
  };

  useEffect(() => {
    if (productList && productTokenValid && indexOfProductForVoucher >= 0) {
      const temp = [...totalAmountForEachProduct];
      temp[indexOfProductForVoucher] = (productList[indexOfProductForVoucher].price * quantities[indexOfProductForVoucher]) - calculateDiscountAmount();
      setTotalAmountForEachProduct(temp);
    }
  }, [quantities, productList, indexOfProductForVoucher, discountValue_backend]);


  return (
    <section className="gap-2 flex p-1 max-w-[1200px]">
      <table className="table-auto w-full">
        <thead className="h-16 bg-neutral-100">
          <tr>
            <th>ITEM</th>
            <th>Voucher</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="">
          {productList.map((x, index) => {
            return (
              <tr className="h-[100px] border-b" key={index}>
                <td className="align-middle">
                  {/* Render productList details from the prop */}
                  <div className="flex w-fit">
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
                <td className="mx-auto text-center py-2">
                  <input type="text"
                    onChange={(e) => {
                      setToken(e.target.value);
                      setIndexOfProductForVoucher(index);
                      if (e.target.value.trim().length === 0) {
                        setIndexOfProductForVoucher(-1);
                      }

                    }}
                    className='border ps-2 rounded-sm py-1'
                    disabled={index != indexOfProductForVoucher && indexOfProductForVoucher != -1}
                    placeholder='enter voucher..'
                  />
                  <button onClick={validate_voucher_token}
                    className='bg-pile-700 text-white p-1 px-2 rounded-md ms-1'
                  >
                    Apply
                  </button>
                </td>
                <td className="mx-auto text-center">Rs. {x.price}</td>
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
                {/* <td className="mx-auto text-center">Rs. {x.price * quantities[index]}</td> */}
                <td className="mx-auto text-center">Rs. {totalAmountForEachProduct[index]}</td>
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
