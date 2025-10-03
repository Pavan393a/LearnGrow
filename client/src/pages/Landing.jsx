import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { userEmailState } from "../store/selectors/userEmail";
import { useState } from "react";
import { Button } from "../components/Button";

export function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gray-800">
            <span className="text-blue-600">Learn</span>
            <span className="text-purple-600">Grow</span>
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="#courses"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Courses
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Features
            </a>

            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              About Us
            </a>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signup");
                    }}
                    label="Signup"
                  />
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signin");
                    }}
                    label="Signin"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-4 6h4"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden mt-2`}
        >
          <a
            href="#courses"
            className="block py-2 px-4 text-gray-600 hover:bg-gray-200"
          >
            Courses
          </a>
          <a
            href="#features"
            className="block py-2 px-4 text-gray-600 hover:bg-gray-200"
          >
            Features
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-600 hover:bg-gray-200"
          >
            Business
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-600 hover:bg-gray-200"
          >
            About Us
          </a>
          <div className="flex flex-col space-y-2 mt-4">
            <a
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md text-center hover:bg-blue-600 hover:text-white transition duration-300"
              onClick={() => navigate("/signin")}
            >
              Login
            </a>
            <a
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            Learn Smarter. Achieve More.
          </h1>
          <p className="mt-6 text-lg md:text-2xl max-w-2xl mx-auto opacity-90">
            Join millions mastering in-demand skills — from web development to
            data science — and shape your tomorrow.
          </p>
          <div className="mt-10 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="#"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-xl"
            >
              Start Learning Now
            </a>
            <a
              href="#"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition duration-300"
            >
              Explore All Courses
            </a>
          </div>
        </div>
      </header>

      {/* Course Categories Section */}
      <section id="courses" className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Popular Course Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L12 19.25 14.25 17m-4.5-2.5V7.5M12 4a8 8 0 100 16 8 8 0 000-16z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Web Development
              </h3>
              <p className="text-gray-600">
                Build modern websites and applications with HTML, CSS,
                JavaScript, and more.
              </p>
            </div>
            {/* Category Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14v6m0-6V8m0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Data Science
              </h3>
              <p className="text-gray-600">
                Analyze and interpret complex data to make informed business
                decisions.
              </p>
            </div>
            {/* Category Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-4m-4 4l4-4m4-12a8 8 0 100 16 8 8 0 000-16z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cybersecurity
              </h3>
              <p className="text-gray-600">
                Protect systems, networks, and data from digital attacks.
              </p>
            </div>
            {/* Category Card 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Graphic Design
              </h3>
              <p className="text-gray-600">
                Create stunning visuals and compelling brand identities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature Card 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Job-Ready Skills
              </h3>
              <p className="text-gray-600">
                Our courses are designed with industry experts to ensure you
                learn the most relevant and in-demand skills for today's job
                market.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="p-4 rounded-full bg-purple-100 text-purple-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13.5m0-13.5C2.56 12.399 2 20.354 2 21h20c0-1.646-.56-9.601-10-14.747z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace, on your own schedule. Our platform is
                accessible 24/7 from any device.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
              <div className="p-4 rounded-full bg-green-100 text-green-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Global Community
              </h3>
              <p className="text-gray-600">
                Connect with fellow learners, share ideas, and get support from
                our vibrant online community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight  text-center text-gray-800 mb-12">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto  text-gray-800 mb-12">
            Sign up today and get access to thousands of courses taught by
            industry leaders.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="#"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Sign Up for Free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">LearnGrow</h3>
            <p className="text-sm">
              Empowering people through education and technology.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* SVG icons for social media links */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cybersecurity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; 2025 LearnGrow. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
