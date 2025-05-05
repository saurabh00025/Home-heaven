import React from 'react';
import { Link } from 'react-router-dom';
import Five_star from './five_star';
import Four_star from './four_star';
import images from '../images';
const LatestProduct = () => {
  return (
    <>
      <div>
        <div className="mx-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
          <div className="col-span-1">
            <Link to="/Antique_table">
              <img src={images.antique1} alt="" />
            </Link>
            <h4>Antique Table</h4>
            <Five_star/>
            <p>$150.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Modern_couch">
              <img src={images.mcouch1} alt="" />
            </Link>
            <h4>Modern Couch</h4>
            <Four_star/>
            <p>$199.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Toska_armchair">
              <img src={images.toskaarm1} alt="" />
            </Link>
            <h4>Toska Armchair</h4>
            <Five_star/>
            <p>$399.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Wolf_rokoko">
              <img src={images.aarmchair1} alt="" />
            </Link>
            <h4>Wolf Rokoko-Arm Chair</h4>
            <Five_star/>
            <p>$249.00</p>
          </div>



          <div className="col-span-1">
            <Link to="/Computer_table">
              <img src={images.comptable1} alt="" />
            </Link>
            <h4>Computer Table</h4>
            <Five_star/>
            <p>$99.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Shiny_table">
              <img src={images.tableshiny1} alt="" />
            </Link>
            <h4>Shiny Table</h4>
            <Four_star/>
            <p>$129.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Arm_chair">
              <img src={images.armchair1} alt="" />
            </Link>
            <h4>Arm Chair</h4>
            <Five_star/>
            <p>$299.00</p>
          </div>

          <div className="col-span-1">
            <Link to="/Egyptian_table">
              <img src={images.egtable1} alt="" />
            </Link>
            <h4>Egyptian Table</h4>
            <Five_star/>
            <p>$399.00</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default LatestProduct
