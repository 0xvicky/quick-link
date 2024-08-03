import React from "react";
import {CustomButtonProps} from "@/types";

const Button = ({btnTitle, method}: CustomButtonProps) => {
  return (
    <button
      className='rounded-md bg px-2 p-2 bg-gradient-to-r from-orange-800 via-red-500 to-yellow-500 hover:outline hover:outline-orange-800 transition-all duration-200'
      onClick={method}>
      {btnTitle}
    </button>
  );
};

export default Button;
