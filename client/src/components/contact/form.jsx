import React,{useState} from 'react';
import { Fade } from 'react-awesome-reveal';
import {useForm,ValidationError} from '@formspree/react';

const Form = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [state, handleSubmit] = useForm('xwkgvlaa');

  const handleSuccess = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    },3000);
  };

  if (showSuccessMessage) {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
        <Fade duration={2000}>
          <p className="text-green-600 text-lg font-semibold">Thanks for Contacting!</p>
          <p className="text-gray-700 mt-2">We will get back to you as soon as possible.</p>
        </Fade>
      </div>
    );
  }

  return (
    <Fade duration={2000}>
        <form onSubmit={(e) => { handleSubmit(e); handleSuccess(); }}>
        <h2 class="text-3xl font-bold mb-4">Send us a Message</h2>
      <div class="formbox space-y-4">
      <div class="flex space-x-32">
        <div class="">
          <input type="text" name="firstName" required = {true} placeholder = "Enter your First Name" class="border p-3 rounded w-full focus:outline-none focus:ring focus:border-blue-500"/>
        </div>
        <div class="">
            <input type="text" name="lastName" placeholder='Enter your Last Name' class="border p-3 rounded w-full focus:outline-none focus:ring focus:border-blue-500"/>
            
        </div>
      </div>
      
      <div class="inputbox">
        <input placeholder = "Enter Your Email" type="email" name="email" required = {true} class="border p-3 rounded w-full focus:outline-none focus:ring focus:border-blue-500"/>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div class="inputbox">
        <input type="text" name="mobileNumber" placeholder = "Enter Your Mobile Number" class="border p-3 rounded w-full focus:outline-none focus:ring focus:border-blue-500"/>
      </div>
      <div class="inputbox">
        <textarea name="message" placeholder = "Enter Your Message" cols="30" rows="5" required = {true} class="border p-3 rounded w-full focus:outline-none focus:ring focus:border-blue-500"></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={state.submitting}>
        Submit
      </button>
      
    </div>
      </form>
    </Fade>
  );
};

export default Form;