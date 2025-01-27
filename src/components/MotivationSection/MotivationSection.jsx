'use client';
import {motion} from "framer-motion"
import Button from '../Button/Button';

const MotivationSection = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-transparent via-yellow-100 to-yellow-200">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-yellow-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Involved
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your support can create ripples of change that transform lives. Join us in our mission to bring smiles to
            underprivileged people. Every contribution, big or small, helps us create lasting impact and build a
            brighter future for all.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button style={"text-white text-lg px-8 py-4 md:px-8 md:py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"}
            bg={"bg-yellow-500 hover:bg-yellow-600"}>
              Volunteer With Us
            </Button>
            <Button
            style={"text-yellow-600 border border-yellow-500 text-lg px-8 py-4 md:px-8 md:py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-slate-900"}
            bg={'bg-white  hover:bg-yellow-200'}
            >
              Make a Donation
            </Button>
          </motion.div>
        </div>
      </section>
    );
};

export default MotivationSection;