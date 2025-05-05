import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Five_star from '../components/five_star';
import Four_star from '../components/four_star';
import Footer from '../components/footer';
import images from '../images';

const Lounger_armchair = () => {
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    const newValue = Math.max(0,e.target.value)
    setValue(newValue);
  };

  const [isAddedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const thumbnails = [
    images.gallery1,
    images.gallery2,
    images.gallery3,
    images.gallery4,
  ];

  const changeImage = (imagePath) => {
    document.querySelector('.main-image').src = imagePath;
  };
  return (
    <>
      <div className="container mx-auto rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0">
      <img src={images.gallery1} className="w-full rounded-lg main-image" alt="Product" />

      <div className="flex justify-between mt-4 space-x-4">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            className="w-1/4 h-16 object-cover rounded-md cursor-pointer thumbnail"
            alt={`Thumbnail ${index + 1}`}
            onClick={() => changeImage(thumbnail)}
          />
        ))}
      </div>
    </div>

        <div className="md:w-1/2 md:pl-8">
          <p className="text-gray-500 text-sm">Home / Arm-Chair</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Lounge ArmChair by WOLFWARD</h2>
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">$250.00</h4>
          <select className="border p-2 my-2 rounded-md">
            <option value="">Select Textures</option>
            <option value="modern-blue">Modern Blue</option>
            <option value="glistening-red">Glistening Red</option>
            <option value="stunning-green">Stunning Green</option>
            <option value="army-blue">Army Blue</option>
            <option value="brown-sand">Brown Sand</option>
          </select>
          <div className="flex items-center space-x-4">
          <input
      type="number"
      value={value}
      onChange={handleChange}
      className="border p-2 my-2 rounded-md w-16"
    />
          <Link
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Link>
          <Link to = "https://www.vectary.com/viewer/v1/?model=078d7a16-8cf3-427f-b547-b2106a2043f9&env=studio3" className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Try it Now!!</Link>
          </div>
          <h3 className="mt-4 text-2xl font-semibold">Product Details<i className="fa fa-indent ml-2"></i></h3>
          <br />
          <p className="text-gray-700">
            The Mid Century Lounge Chair is a timeless classic. It represents the epitome of armchair comfort with its precise lines of the plywood shell. The softness from its Aniline Leather also forms a restful seat. This high-quality Lounge Chair, made from the highest quality material features an improved 5 Star Base design that supports your back with comfort, Premium Aniline Leather, and Bent Plywood Base & Stainless Steel Frame.
          </p>
        </div>
      </div>
    </div>

    {isAddedToCart && (
        <div className=" inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white py-2 px-4 rounded">
            Product added successfully to the cart!
          </div>
        </div>
      )}
      
    <div class="container mx-auto py-16">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">Related Products</h2>
        <p class="text-blue-500 cursor-pointer transition duration-300 hover:text-blue-700">View More</p>
      </div>
    </div>

    


    <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div class="col-4">
            <Link to = "/Armchair_patricia" class="block mb-4">
                <img src={images.product_2} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Armchair Patricia</h4>
            <Five_star/>
            <p class="text-lg">$250.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Futon_armchair" class="block mb-4">
                <img src={images.product_4} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Futon Armchair</h4>
            <Four_star/>
            <p class="text-lg">$299.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Arm_chair" class="block mb-4">
                <img src={images.armchair1} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Arm Chair</h4>
            <Five_star/>
            <p class="text-lg">$299.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Wolf_rokoko" class="block mb-4">
                <img src={images.aarmchair1} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Wolf Rokoko-Arm Chair</h4>
            <Five_star/>
            <p class="text-lg">$249.00</p>
        </div>
    </div>
</div>
      <Footer/>
    </>
  )
}

export default Lounger_armchair
