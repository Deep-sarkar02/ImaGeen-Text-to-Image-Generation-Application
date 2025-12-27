import React from "react";
import { assets } from "../assets/assets";
const Footer = () => {
    return (
        <div className="flex items-center justify-between gap-4 py-3 mt-20">
            {/* here we will add the logo from the left side */}
            <div className='flex items-center gap-1.5'>
                <img className='w-8' src={assets.logo_icon} alt="" />
                <span className='text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>ImaGeen</span>
            </div>
            <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @ImaGeen  |  All rights reserved.</p>
            <div className="flex gap-2.5">
                <img src={assets.facebook_icon} alt="" width={35} />
                <img src={assets.twitter_icon} alt="" width={35} />
                <img src={assets.instagram_icon} alt="" width={35} />
            </div>
        </div>
    )
}
export default Footer;