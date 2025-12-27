import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from 'framer-motion'
const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center my-20 py-12">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Customer Testimonials</h2>
            <p className="text-gray-600  mb-12">
                Hear from our satisfied clients who have transformed their ideas into reality with our services.
            </p>

            <div className="flex flex-wrap gap-6">
                {/* get the data from the testimonialsa data */}
                {testimonialsData.map((testimonial, index) => (
                    // in this div we will show the testimonial
                    <div key={index} className="bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pinter hover:scale-[1.02] transition-all">
                        <div>
                            <img src={testimonial.image} alt="" className="rounded-full w-14" />
                            <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
                            <p className="text-gray-500 mb-4">{testimonial.role}</p>
                            <div className="flex mb-4">
                                {/* here we will add an arrayfor the stars */}
                                {Array(testimonial.stars).fill().map((item, index) => (
                                    <img key={index} src={assets.rating_star} alt="" />
                                ))}
                            </div>
                            <p className="text-center text-sm text-gray-600">{testimonial.text}</p>
                        </div>
                    </div>
                ))}

            </div>

        </motion.div>
    );
};
export default Testimonials;