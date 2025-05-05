import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import FeaturedProduct from "../components/FeaturedProduct";
// import LatestProduct from "../components/latestProduct";
import Five_star from '../components/five_star';
import Four_star from '../components/four_star';
import Footer from '../components/footer';
import images from '../images';
import ImageCarousel from './ImageCarousel.jsx';
import { BASE_URL } from '../url.js';


const home = () => {
  const sofa = {
    background: 'radial-gradient(#fff, #ffd6d6)'
  }
  const [product, setProduct] = useState(null); // State to store the product
  const type = "ExclusiveAvailable"; // Define the type or get it from props/state
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getProductByCategoryAndType?type=${type}`);
      setProduct(response.data.length ? response.data[0] : null); // Get the first product if available
    } catch (error) {
      console.error('Error fetching the product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  
    if (!product) {
      return null; // Show loading state while fetching
    }

  return (
    <>
    <div className="text-black">
      <div class = "p-16 rounded" style = {sofa}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Give your taste<br />
            an aesthetic sense!
          </h1>
          <p className="mt-4 text-sm md:text-base">
            CrEaTiViTy In EvErY ExPlOsIoN iNnOvAtEs yOu,<br />
            InNoVaTe YoUr HoMe, ShApInG yOuR nEeD tO mEeT tHe FuTuRe.
          </p>
          <div class = "py-2">

          </div>
          <Link to = "/products" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
            Explore Now
          </Link>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <ImageCarousel/>
        </div>
      </div>
      </div>
      
      <div className = "flex space-x-2 py-20 px-20">
    <div className = "flex-none w-1/3 px-5">
        <img src = {images.category_1} alt="" class="w-full h-auto rounded-md" />
    </div>
    <div className = "flex-none w-1/3 px-5">
        <img src={images.category_2} alt="" class="w-full h-auto rounded-md" />
    </div>
    <div className = "flex-none w-1/3 px-5">
        <img src={images.category_3} alt="" class="w-full h-auto rounded-md" />
    </div>
</div>
    <h1 className="text-center font-bold text-black text-3xl underline-red text-gray-500">Featured Products</h1>
    <div className="mx-auto border-b-4 border-red-500 w-20 rounded-full "></div>
    <div className = "py-20">
      <FeaturedProduct/>
    </div>

  

    <div className="px-20" style={sofa}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="col-2">
      <img
        src={product.images && product.images.length > 0 ? product.images[0] : ''} // Access the first image
        className="offer-img"
        alt={product.name}
      />
    </div>
    <div className="py-32">
      <div className="col-2 py-32 px-4">
        <p className="text-2xl">Exclusively available</p>
        <h1 className="text-5xl font-bold py-2">{product.name}</h1>
        <Five_star />
        <div className="py-10">
          <Link
            to={`/productDetails/${product._id}`} // Use product ID for routing
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Buy Now &#8594;
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


  <div class= "py-16">
    <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <Link class="shadow-2xl transition-transform duration-500 transform hover:-translate-y-2">
        <i class="fa fa-quote-left text-4xl px-32 text-red-600"></i>

        <p class="text-gray-800 m-4">
        I had never purchased furniture online, so I had no idea what to expect, but the team portrayed consummate professionalism. I am impressed by your design abilities and seamless coordination skills. I adore my new space, and I am forever grateful to you and your team.
Your team has an amazing gift to transform your home from ordinary to outstanding! From design to execution, they make it fun and even exhilarating. They work to create a plan of action with different options and varying budgets.
Working with Decor was such a pleasure that I am tempted to move just so we can start all over again! I know you will continue to brighten many lives; thank you for your part in ours!
        </p>
        <div class = "px-32"><Four_star/></div>
        <img src={images.mayank} alt="" class="mt-4 mx-auto block rounded-full w-16 h-16"/>
        <h3 class="text-center text-xl font-bold mt-2 py-2">Mayank Dass</h3>
      </Link>

      
      <Link class="shadow-2xl transition-transform duration-500 transform hover:-translate-y-2">
      <i class="fa fa-quote-left text-4xl px-32 text-red-600"></i>
        <p class="text-gray-800 m-4">
          I just wanted to say thanks for the consultation – so helpful and informative! We're very excited about turning our space into our place. I am so glad that I stumbled across Interior Icons. It has the style of furniture that I love most, and it offers its items at prices that meet my budget. I am hooked. 
        </p>
        <div class = "px-32"><Four_star/></div>
        <img src={images.shivani} alt="" class="mt-4 mx-auto block rounded-full w-16 h-16"/>
        <h3 class="text-center text-xl font-bold mt-2">Shivani Kumari</h3>
      </Link>

      <Link class="shadow-2xl transition-transform duration-500 transform hover:-translate-y-2">
        <i class="fa fa-quote-left text-4xl px-32 text-red-600 "></i>
        <p class="text-gray-800 m-4">
          When looking around for new furniture, my spouse happened to click on an ad for Interior Icons. Game changer! I'll never shop elsewhere for furniture again. To say I'm happy is an understatement.
        </p>
        <div class = "px-32"><Five_star/></div>
        <img src={images.shailendra} alt="" class="mt-4 mx-auto block rounded-full w-16 h-16"/>
        <h3 class="text-center text-xl font-bold mt-2">Shailendra Kumar</h3>
      </Link>
    </div>
  </div>
</div>

  <div class="container mx-auto">
    <div class="py-20 grid grid-cols-1 md:grid-cols-5 gap-4">
      <Link to = "https://www.godrej.com/" target = "_blank"><img src={images.logoGodrej} alt="" class="mx-auto" /></Link>
      <Link to = "https://www.oppo.com/" target = "_blank"><img src={images.logoOppo} alt="" class="mx-auto" /></Link>
      <Link to = "https://www.paypal.com/" target = "_blank"><img src={images.logoPaypal} alt="" class="mx-auto" /></Link>
      <Link to = "https://www.philips.com/" target = "_blank"><img src={images.logoPhilips} alt="" class="mx-auto" /></Link>
      <Link to = "https://www.coca-cola.com/" target = "_blank"><img src={images.logoCocaCola} alt="" class="mx-auto" /></Link>
  </div>
</div>
    </div>
    <Footer/>
  </>
    
  );
};

export default home;
