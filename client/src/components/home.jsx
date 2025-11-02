import React from "react";
import { FaPencilAlt, FaSpellCheck, FaSyncAlt } from "react-icons/fa";
import ai from "../images/ai.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-200 to-purple-300 text-black py-20 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center ">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
              Smarter Writing Starts Here
              </h2>
              <p className="text-xl mb-8 ">
              Harness the power of AI to refine your grammar, fix spelling mistakes, and elevate your writing style with precision.
              </p>
              <Link
                to="/write"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
              >
                Start Writing Now
              </Link>
            </div>
            <div className="md:w-1/2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ml-3">
              <img
                style={{ width: "70%", height: "auto" }}
                src={ai}
                alt="AI Writing"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-700 text-transparent bg-clip-text">
              Powerful Features at Your Fingertips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
              <FeatureCard
                icon={<FaPencilAlt className="text-6xl text-blue-500 " />}
                title="Smart Grammar Correction"
                description="Our AI analyzes context to provide accurate grammar suggestions, helping you write with confidence."
               
              />
              <FeatureCard
                icon={<FaSpellCheck className="text-6xl text-green-500" />}
                title="Advanced Spell Checker"
                description="Catch even the most elusive spelling errors with our comprehensive dictionary and context-aware spell check."
              />
              <FeatureCard
                icon={<FaSyncAlt className="text-6xl text-purple-500" />}
                title="Intelligent Rephrasing"
                description="Transform your sentences for clarity and impact, tailored to your desired tone and style."
              />
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="bg-gray-800 text-white py-8 text-center">
       
      </footer> */}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gradient-to-r from-pink-200 to-purple-300  p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;