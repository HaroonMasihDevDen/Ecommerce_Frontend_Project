import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import ProductAndCategoryGrid from '../Components/ProductAndCategoryGrid';
import { getCategories, getCategoriesByID } from '../api/category';
import { getProducts, searchProductsApi } from '../api/product';
import Carousel from '../Components/Carousel';

export default function Home() {
  const [categoryItems, setCategoryItems] = useState(null);
  const [productItems, setProductItems] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [0]);

  const fetchCategories = async () => {
    const categories = await getCategories();
    setCategoryItems(categories);
    console.log("categoryItems:::", categories);
  };

  const fetchProducts = async () => {
    const products = await getProducts();
    console.log("products:::", products);

    setProductItems(products);
    console.log("categoryItems:::", products);
  };

  const searchProductOfThisCategory = async (catg_ids) => {
    const products = await getCategoriesByID(catg_ids);
    setProductItems(products);
  };

  const searchProducts = async (query) => {
    console.log(query);
    alert(query);
    if (!query) {
      return;
    }
    alert(1);
    const products = await searchProductsApi(query);
    setProductItems(products);
  };

  return (
    <>
      <div className=''>
        <div className='absolute w-[100vw]'>
          <Navbar searchProducts={searchProducts} />
        </div>
        <div className="header w-[100%] h-[80vh] bg-[#ebdfbec6] pt-[5rem] bg-gradient-to-r from-[#FDE9E0] via-white to-[#cfebf3]">
          <div className='grid grid-cols-2 w-[100%]'>
            <div className='left_div bg-transparent flex flex-col justify-center'>
              <div className=''>
                <h className='text-4xl font-albert'>Unleash Your Inner Style</h>
                <p>Trendy, bold, and made for you</p>
                <button className='btn p-2 mt-4 bg-blue-300 rounded-md'>Shop Now</button>
              </div>
            </div>
            <div className='right_div ml-0 flex justify-center'>
              <Carousel />
            </div>
          </div>
        </div>
        <div className="p-4 h-[70rem]">

          <div className='ProductAndCategoryGrid h-[100%] w-full p-3 '>
            <ProductAndCategoryGrid productItems={productItems} categoryItems={categoryItems} searchProductOfThisCategory={searchProductOfThisCategory}></ProductAndCategoryGrid>
          </div>
        </div>
      </div>
      poppins

    </>
  );
}
