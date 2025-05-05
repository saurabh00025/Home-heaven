import {Link} from 'react-router-dom';
import Footer from '../footer';
import Form from './form';
const contact = () => {
  const bg = {
    background: '#f2e9e9'
  }
  return (
    <>
    <div style = {bg}>
    
    <div class="mx-auto flex justify-between py-12 p-6">
    
    <div>
    <h2 class="text-3xl font-bold mb-6">Contact Info</h2>
    <ul class="info space-y-4">
      <li class="flex items-center">
        <span class=" p-2 rounded-full">
        <svg class="h-12 w-12 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />  <circle cx="12" cy="10" r="3" /></svg>

        </span>
        <div class="ml-2">
          <span class="font-bold">MNNIT ALLAHABAD Prayagraj U.P. 211004</span>
        </div>
      </li>
      <li class="px-3 flex items-center">
      <svg class="h-10 w-12 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" /></svg>
        <span class="font-bold ml-3">saurabhmaurya0025@gmail.com</span>
      </li>
      <li class="px-3 flex items-center">
      <svg class="h-12 w-12 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
        <span class="ml-4 font-bold">+91 7266817216</span>
      </li>

      <ul class="flex space-x-4 px-32">
        <li><Link class="text-4xl text-gray-800 hover:text-gray-500 transition"><i class="fa fa-facebook-f"></i></Link></li>
        <li><Link class="text-4xl text-gray-800 hover:text-gray-500 transition"><i class="fa fa-twitter"></i></Link></li>
        <li><Link to = "https://www.instagram.com/saurabh_maurya10/" class="text-4xl text-gray-800 hover:text-gray-500 transition"><i class="fa fa-instagram"></i></Link></li>
        <li><Link class="text-4xl text-gray-800 hover:text-gray-500 transition"><i class="fa fa-youtube"></i></Link></li>
      </ul>
    </ul>
    
  </div>

  <div class="bg-white text-gray-800 p-16 rounded-md h-50">
    <div class="formbox space-y-4">
      <div class="flex space-x-32">
        <Form/>
      </div>
    </div>
    
  </div>
</div>
</div>
    <Footer/>
    </>
  )
}

export default contact