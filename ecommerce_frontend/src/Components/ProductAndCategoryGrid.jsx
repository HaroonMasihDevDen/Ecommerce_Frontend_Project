import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductCard from './ProductCard';
import Categories from './Categories';
import Filters from './Filters';

const ProductAndCategoryGrid = ({ productItems, categoryItems, searchProductOfThisCategory }) => {


   return (
      <>
         <div className="flex w-[100%] h-[100%] px-6" >

            <div className="category w-[25%] p-4">
               <div>
                  <Categories categoryItems={categoryItems} searchProductOfThisCategory={searchProductOfThisCategory} />
               </div>
               <div>
                  <Filters />
               </div>
            </div>

            <div className="w-[80%]  h-[70rem]">
               <div className='bg-gray-50 p-4 flex flex-wrap justify-start gap-y-2 p-auto'>
                  {productItems !== null && productItems !== undefined && (
                     productItems.map(product => (
                        product.imageUrl = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
                        <ProductCard key={product.id} product={product} />
                     )))}
               </div>
            </div>
         </div >
      </>
   );
};

export default ProductAndCategoryGrid;
