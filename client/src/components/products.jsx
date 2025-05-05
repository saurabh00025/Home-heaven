import {Link} from 'react-router-dom'
import FeaturedProduct from "./FeaturedProduct";
import LatestProduct from "./latestProduct";
import Footer from './footer';
const products = () => {
  return (
    <>
    <div>
      <div class="flex items-center justify-between py-16 px-16">
        <h2 class="text-2xl font-bold px-16">All Products</h2>
        <select class="border p-2 rounded-md text-black">
          <option value="" class="bg-white text-gray-800">Default Sorting</option>
          <option value="" class="bg-white text-gray-800">Sort by Price</option>
          <option value="" class="bg-white text-gray-800">Sort by Popularity</option>
          <option value="" class="bg-white text-gray-800">Sort by Rating</option>
          <option value="" class="bg-white text-gray-800">Sort by Sales</option>
        </select>
      </div>

      <FeaturedProduct/>
      <LatestProduct/>

      <Footer/>
    </div>
    </>
  )
}

export default products
