import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductCard from './ProductCard';
import CategoryList from './CategoryList';
import Filters from './Filters';

export default function ProductAndCategoryGrid({ productItems, categoryItems, searchProductOfThisCategory }) {
   return (
      <div className="flex w-[100%] px-6" >
         <div className="category w-[20%] p-4">
            <div>
               {/* <CategoryList categoryList={categoryItems} searchProductOfThisCategory={searchProductOfThisCategory} /> */}
            </div>
            <div>
               <Filters categoryList={categoryItems || []} searchProductOfThisCategory={searchProductOfThisCategory} />
            </div>
         </div>

         <div className="w-[80%] ">
            <div className='p-4 flex flex-wrap justify-start gap-y-2 p-auto'>
               {productItems !== null && productItems !== undefined && (
                  productItems.map(product => (
                     // product.imageUrl = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb',
                     product.imageUrl = 'https://picsum.photos/200/300?random=1',
                     <ProductCard key={product.id} product={product} />
                  )))}
            </div>
         </div>
      </div >
   );
};


