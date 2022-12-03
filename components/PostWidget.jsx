import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
  console.log(relatedPosts);
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? "Posts Relacionados" : "Posts Recentes"}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img src={post.featuredImage.url} alt="" height="60px" width="60px" className="align-middle rounded-full" />
          </div>
          <div className="flex-grow ml-4">
            <p>{moment(post.createdAt).format("MMM. DD, YYYY")}</p>
            <Link href={`/post/${post.slug}`} key={index} className="text-md">
              <span className="cursor-pointer transition-colors duration-200 hover:text-[#afb839]">{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
