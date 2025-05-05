import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Five_star from '../components/five_star';
import Four_star from '../components/four_star';
import Footer from '../components/footer';
import images from '../images';
const Arm_chair = () => {
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
    images.armchair2,
    images.armchair3,
    images.armchair4,
    images.armchair5,
  ];

  const changeImage = (imagePath) => {
    document.querySelector('.main-image').src = imagePath;
  };


  return (
    <>
      <div className="container mx-auto p-3 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
      <img src={images.armchair1} className="w-full rounded-lg main-image" alt="Product" />

      <div className="flex justify-between mt-4 space-x-4">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            className="w-1/4 h-16 object-cover rounded-md cursor-pointer thumbnail"
            alt={`Thumbnail ${index + 2}`}
            onClick={() => changeImage(thumbnail)}
          />
        ))}
      </div>
    </div>

        <div className="md:w-1/2 md:pl-8">
          <p className="text-gray-500 text-sm">Home / ArmChair</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Brown ArmChair</h2>
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">$299.00</h4>
          <select className="border p-2 my-2 rounded-md">
            <option value="">Select Size</option>
            <option value="modern-blue">XXL</option>
            <option value="glistening-red">XL</option>
            <option value="stunning-green">Large</option>
            <option value="army-blue">Medium</option>
            <option value="brown-sand">Small</option>
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

      
          <Link className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Try it Now!!</Link>
          </div>
          <h3 className="mt-4 text-2xl font-semibold">Product Details<i className="fa fa-indent ml-2"></i></h3>
          <br />
          <p className="text-gray-700">
          Invoking the spirit of 'old world charm meets contemporary', this leather chair captures the timeless essence of an authentic heirloom collection. Majestic yet inviting, the chair’s high back, gracefully curved contemporary arms and luxurious upholstery in supple, vintage finish leather delivers exquisite style with exceptional comfort. Accented with a pedestal recliner, this elegant ensemble creates a warm and welcoming place to relax at the end of a hectic day.
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

            <Link to = "/Lounger_armchair" class="block mb-4">
                <img src={images.product_1} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Lounger Armchair</h4>
            <Five_star/>
            <p class="text-lg">$250.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Wolf_rokoko" class="block mb-4">
                <img src={images.aarmchair1} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Wolf Rokoko-Arm Chair</h4>
            <Five_star/>
            <p class="text-lg">$249.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Toska_armchair" class="block mb-4">
                <img src={images.toskaarm1} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Toska ArmChair</h4>
            <Five_star/>
            <p class="text-lg">$399.00</p>
        </div>

        <div class="col-4">
            <Link to = "/Futon_armchair" class="block mb-4">
                <img src={images.product_4} alt="" class="w-full h-auto"/>
            </Link>
            <h4 class="text-lg font-semibold">Futon Armchair</h4>
            <Four_star/>
            <p class="text-lg">$299.00</p>
        </div>
    </div>
</div>
      <Footer/>
    </>
  )
}

export default Arm_chair
