import Navbar from '../Components/Navbar';
import ProductAndCategoryGrid from '../Components/ProductAndCategoryGrid';

export default function Home() {
  return (
    <>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="header">
        this is the headers
      </div>
      <div className="p-4 h-[70rem]">

        <div className='ProductAndCategoryGrid h-[100%] w-full p-3 '>
          <ProductAndCategoryGrid></ProductAndCategoryGrid>
        </div>
      </div>

    </>
  );
}
