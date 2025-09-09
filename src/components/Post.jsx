import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { updateDocumentMeta, addStructuredData, seoConfigs, generateWebsiteStructuredData } from "../utils/seo";

// Function to get default descriptions based on post title
const getDefaultDescription = (title) => {
  const descriptions = {
    "合歡山": "南投埔里",
    "武陵": "南投埔里", 
    "MotoGP馬來西亞雪邦站": "馬來西亞",
    "本田Honda博物館": "茂木町 日本栃木縣",
    
    "default": "探索亞洲豐富多元的飲食文化，從街頭小吃到精緻料理，每一道菜都有其獨特的故事。"
  };
  
  // Check if title contains specific keywords
  if (title && title.includes("合歡山")) return descriptions["合歡山"];
  if (title && title.includes("武陵")) return descriptions["武陵"];
  if (title && title.includes("MotoGP馬來西亞雪邦站")) return descriptions["MotoGP馬來西亞雪邦站"];
  if (title && title.includes("本田Honda博物館")) return descriptions["本田Honda博物館"];
  
  return descriptions["default"];
};

const Post = () => {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    // Update SEO meta tags for blog listing page
    const baseUrl = window.location.origin;
    const blogSEO = {
      ...seoConfigs.blog,
      canonical: `${baseUrl}/post`,
      ogUrl: `${baseUrl}/post`,
      ogImage: `${baseUrl}/assets/Logo.png`,
      twitterImage: `${baseUrl}/assets/Logo.png`
    };
    
    updateDocumentMeta(blogSEO);
    
    // Add structured data for blog
    const blogStructuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Jack網站 - 旅遊部落格",
      "description": "分享台灣與亞洲旅遊體驗的部落格",
      "url": `${baseUrl}/post`,
      "author": {
        "@type": "Person",
        "name": "Jack Chen"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Jack網站",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/Logo.png`
        }
      }
    };
    addStructuredData(blogStructuredData);

    sanityClient
      .fetch(
        `*[_type == "post"]{
           title,
           slug,
           description,
           publishedAt,
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">最新文章</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {postData &&
            postData.map((post, index) => (
              <article key={post.slug.current} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={`/post/${post.slug.current}`} className="block">
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover"
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', pointerEvents: 'auto' }}
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600">{40 + index}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.description || getDefaultDescription(post.title)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{post.publishedAt ? formatDate(post.publishedAt) : '2024年12月1日'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>閱讀時間 {Math.floor(Math.random() * 5) + 3} 分鐘</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                        Read More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Post;
