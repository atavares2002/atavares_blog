import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCategories } from "../services";

// const categories = [
//   { name: "React", slug: "react" },
//   { name: "Web Development", slug: "webdev" },
// ];

const Header = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full flex flex-row justify-between border-[#afb839] py-8 border-opacity-60">
        <div className="">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-[#afb839] hover:text-white transition duration-200">@atavares Blog</span>
          </Link>
        </div>
        <div className="hidden lg:inline-block">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="transition duration-200 mt-2 align-middle text-[#afb839] ml-4 font-semibold cursos-pointer hover:text-white">{category.name}</span>
            </Link>
          ))}
          <Link href="https://atavares.com">
            <span className="transition duration-200 hover:bg-white bg-[#afb839] text-base font-medium rounded-full text-white hover:text-gray-900 px-5 py-2 cursor-pointer ml-4">Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
