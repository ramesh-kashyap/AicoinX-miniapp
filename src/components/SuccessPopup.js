import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const SuccessPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{zIndex:1}}>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#14102b] p-6 rounded-2xl text-center max-w-sm w-full relative shadow-xl border border-[#6c42fc]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose size={24} />
            </button>
            
            <div className="flex justify-center mb-4">
              <img src="/assets/success-animation.gif" alt="Success" className="w-28" />
            </div>

            <h2 className="text-3xl font-bold text-white">Success</h2>
            <p className="text-gray-300 mt-2 text-sm">Your points have been successfully claimed</p>
            
            <button
              className="mt-5 bg-[#6c42fc] w-full py-3 rounded-full text-lg font-bold shadow-md hover:bg-[#5a36d1]"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
   </div>
  );
};

export default SuccessPopup;
