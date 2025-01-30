import { useState, useEffect } from "react";
import sanityClient from "../../src/client";
import { Link } from "react-router-dom";

const Post = () => {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
           title,
           slug,
           mainImage{
             asset->{
               _id,
               url
             },
             alt
           }
        }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-slate-700 p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {postData &&
          postData.map((post) => (
            <article key={post.slug.current} className="max-w-md mx-auto overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
              <Link to={`/post/${post.slug.current}`} className="block hover:shadow-lg transition duration-300">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-48"
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                      onContextMenu={(e) => e.preventDefault()} // 禁用右鍵菜單
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-semibold tracking-wide text-indigo-500 uppercase">
                      Blog Post
                    </h2>
                    <h3 className="mt-1 text-xl font-medium text-black hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      閱讀更多
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Post;
