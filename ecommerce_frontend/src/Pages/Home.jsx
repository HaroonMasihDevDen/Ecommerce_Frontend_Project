import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import ProductAndCategoryGrid from '../Components/ProductAndCategoryGrid';
import { getCategories, getCategoriesByID } from '../api/category';
import { getProducts, searchProductsApi } from '../api/product';
import Carousel from '../Components/Carousel';
import CategoriesRounded from '../Components/CategoriesRounded';
import CircularSlider from '../Components/CircularSlider';

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
        <div className='absolute w-[97vw]'>
          <Navbar searchProducts={searchProducts} />
        </div>
        <div className="header w-[100%] h-[100vh] bg-[#ebdfbec6] pt-[5rem] bg-gradient-to-r from-[#FDE9E0] via-white to-[#cfebf3]">

          <div className=' hidden grid grid-cols-2 w-[100%]'>
            <div className='left_div grid grid-cols-1'>
              <div className='left_top flex flex-col pt-16 pb-6 justify-center items-center'>
                <h className='text-4xl font-albert'>Unleash Your Inner Style</h>
                <p>Trendy, bold, and made for you</p>
                <button className='btn p-2 mt-4 bg-blue-300 rounded-md w-fit'>New Arrivals</button>
              </div>

              <div className='left_bottom flex flex-wrap justify-center items-center text-center'>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/4.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/6.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>
                <div className="cursor-pointer w-[10rem]">
                  <img src="https://mdbcdn.b-cdn.net/img/new/avatars/7.webp" alt="men category image"
                    className='border-3 p-4 rounded-full w-[9rem] h-[9rem] text-center'
                  />
                  <h className="text-md font-albert">Men</h>
                </div>



              </div>

            </div>
            <div className='right_div ml-0 pt-8 flex justify-center'>
              <Carousel />
            </div>
          </div>

          <div className=' my-4 mx-8 h-[95%] bg-white/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl p-0'>
            <div className='parent_hero grid grid-cols-2 w-full h-full'>
              <div className='left_hero  w-[100%] flex justify-center items-center'>

                <div className='left_top flex flex-col pt-16 pb-6 justify-center items-center'>
                  <h className='text-4xl font-albert'>Unleash Your Inner Style</h>
                  <p className='py-4'>Trendy, bold, and made for you</p>
                  {/* <button className='btn p-2 mt-4 bg-blue-300 rounded-md w-fit'>New Arrivals</button>
                   */}
                  <div className='flex gap-4 animate-fadeIn delay-300'>
                    <button className='px-6 py-3 bg-primary-light text-white rounded-full transition-all hover:bg-primary active:bg-primary-dark'>
                      New Arrivals
                    </button>
                    <button className='px-6 py-3 border-2 border-primary-light rounded-full hover:bg-primary-light hover:text-white transition-all active:bg-primary'>
                      Shop Collection
                    </button>
                  </div>
                </div>
              </div>
              <div className='right_hero relative w-[100%] h-full flex justify-center items-center'>
                <CircularSlider />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 h-[70rem]">
          <div className='ProductAndCategoryGrid h-[100%] w-full p-3 '>
            <ProductAndCategoryGrid productItems={productItems} categoryItems={categoryItems} searchProductOfThisCategory={searchProductOfThisCategory}></ProductAndCategoryGrid>
          </div>
        </div>
      </div>
    </>
  );
}
