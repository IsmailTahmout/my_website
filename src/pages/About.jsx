import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 transition-transform duration-300 hover:scale-105">About Us</h1>
                <p className="text-gray-700 text-base mb-4">
                    Welcome to our website! We are dedicated to providing the best service possible to our customers.
                </p>
                <p className="text-gray-700 text-base mb-4">
                    Our team is comprised of experts in their respective fields, always striving for excellence.
                </p>
                <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 transition duration-300 ease-in-out">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default About;
