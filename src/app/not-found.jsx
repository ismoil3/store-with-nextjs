"use client"
import Link from "next/link";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import { useEffect, useState } from "react";

const NotFoundPage = () => {

    return (
      <div className="w-[100%] h-[100svh] fixed top-0 right-0 bg-[#000000a5] z-[99] flex items-center justify-center">
        <div className="bg-[white] rounded-md flex flex-col w-[80%] s:w-[56%] sm:w-[46%] md:w-[35%] lg:w-[30%] container xl:w-[25%] 2xl:w-[22%]">

          {/* <div className="w-[100%] border-b-2 border-b-[#ccc] p-[10px_20px] flex items-center justify-center font-[500] text-[20px]">
            Not Found
          </div> */}
          <div className="p-[20px_20px_20px_20px] flex flex-col items-center gap-2">
            <div className="w-[50px] h-[50px] bg-[#ff00003a] rounded-full flex items-center justify-center">
              <WarningAmberRoundedIcon className="text-[#eb0020]" fontSize="large"/>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[20px] text-[#262626] font-bold">Page Not Found</h1>
              <p className="text-[#303030] text-center ">Oops! The page you’re looking for doesn’t exist.</p>
            </div>
            <div className="flex items-center justify-between w-[100%]">
              <button className="p-[6px_24px] w-[48%] bg-[#cccccc76] text-[#262626] font-bold cursor-pointer rounded-full"><Link href={'/'}>Keep It</Link></button>
              <button className="p-[6px_24px] w-[48%] bg-[#eb0020] text-white font-bold cursor-pointer rounded-full"><Link href={'/'}>Home</Link></button>
            </div>
          </div>
          {/* <div className="w-[100%] border-t-2 border-t-[#ccc] p-[20px]"></div> */}
  
        </div>
      </div>
    );
  // }  
};

export default NotFoundPage;
