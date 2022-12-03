import React from "react";
import Image from "next/image";

function Author({ author }) {
  return (
    <div className="text-center flex flex-col justify-center mt-28 mb-8 p-12 rounded-lg bg-white bg-opacity-20">
      <div className=" flex justify-center -mt-28">
        <Image unoptimized src={author.photo.url} alt={author.name} className="rounded-full" width={100} height={100} />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
}

export default Author;
