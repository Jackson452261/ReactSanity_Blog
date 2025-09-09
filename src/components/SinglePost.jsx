import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url"
import BlockContent from  "@sanity/block-content-to-react"

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

const SinglePost = () => {

   const builder =  imageUrlBuilder(sanityClient)
   function urlFor(source){
    return builder.image(source)
   }
   const [SinglePost, setSinglePost] = useState(null)
   const [relatedPosts, setRelatedPosts] = useState([])
   const { slug } = useParams()

   useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
       title,
       _id,
       slug,
       description,
       publishedAt,
       mainImage{
        asset->{
        _id,
        url
        }
        },
        body,
        "name": author->name,
        "authorImage": author->image,
    }`).then((data) => setSinglePost(data[0]))
    .catch(console.error)

    // Fetch related posts
    sanityClient.fetch(`*[_type == "post" && slug.current != "${slug}"][0...3]{
       title,
       slug,
       publishedAt,
       mainImage{
        asset->{
        _id,
        url
        }
       }
    }`).then((data) => setRelatedPosts(data))
    .catch(console.error)
   },[slug]);

   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
   };

   if(!SinglePost) 
    return <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-lg text-gray-600">等待...</div>
    </div>

  return (
   <main className='bg-gray-50 min-h-screen' onContextMenu={(e) => e.preventDefault()}>
     {/* Hero Section with Background Image */}
     <section className='relative h-96 overflow-hidden'>
       <div className='absolute inset-0'>
         <img 
           src={SinglePost.mainImage.asset.url}
           alt={SinglePost.title}
           className="w-full h-full object-cover"
           onContextMenu={(e) => e.preventDefault()}
           onDragStart={(e) => e.preventDefault()}
           style={{ userSelect: 'none', pointerEvents: 'auto' }}
         />
         <div className='absolute inset-0 bg-black bg-opacity-50'></div>
       </div>
       <div className='relative z-10 flex items-center justify-center h-full text-white text-center px-4'>
         <div className='max-w-4xl'>
           <div className='inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4'>
             BLOG
           </div>
           <h1 className='text-3xl md:text-5xl font-bold mb-4'>{SinglePost.title}</h1>
           <p className='text-lg md:text-xl mb-6 text-gray-200'>
             {SinglePost.description || getDefaultDescription(SinglePost.title)}
           </p>
           <div className='flex items-center justify-center space-x-6 text-sm'>
             <div className='flex items-center space-x-2'>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span>{SinglePost.publishedAt ? formatDate(SinglePost.publishedAt) : '2024年12月15日'}</span>
             </div>
             <div className='flex items-center space-x-2'>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
               </svg>
               <span>閱讀時間 8 分鐘</span>
             </div>
             <div className='flex items-center space-x-2'>
               <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               </svg>
               <span>49</span>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* Main Content Area */}
     <div className='container mx-auto px-4 py-12'>
       <div className='flex flex-col lg:flex-row gap-12'>
         {/* Main Content */}
         <div className='lg:w-2/3'>
           {/* Author Section */}
           <div className='flex items-center mb-8 p-6 bg-white rounded-lg shadow-sm'>
             <div className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4'>
               {SinglePost.authorImage ? (
                 <img 
                   src={urlFor(SinglePost.authorImage).width(64).height(64).url()}
                   alt={SinglePost.name}
                   className="w-16 h-16 rounded-full object-cover"
                   onContextMenu={(e) => e.preventDefault()}
                   onDragStart={(e) => e.preventDefault()}
                   style={{ userSelect: 'none', pointerEvents: 'auto' }}
                 />
               ) : (
                 <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                 </svg>
               )}
             </div>
             <div>
               <h3 className='font-semibold text-gray-900'>{SinglePost.name || 'Kevin Chen'}</h3>
               <p className='text-gray-600 text-sm'>Travel Writer & Photographer</p>
               <p className='text-gray-500 text-xs'>Published on {SinglePost.publishedAt ? formatDate(SinglePost.publishedAt) : '2024年12月15日'}</p>
             </div>
           </div>

           {/* Article Content */}
           <article 
             className='prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8'
             onContextMenu={(e) => e.preventDefault()}
             onDragStart={(e) => e.preventDefault()}
             style={{ userSelect: 'text' }}
           >
             <div 
               onContextMenu={(e) => e.preventDefault()}
               style={{ 
                 userSelect: 'text',
               }}
             >
               <BlockContent 
                 blocks={SinglePost.body} 
                 projectId="tp2f1obx" 
                 dataset="production"
                 serializers={{
                   types: {
                     image: (props) => (
                       <img
                         src={urlFor(props.node.asset).url()}
                         alt={props.node.alt || ''}
                         onContextMenu={(e) => e.preventDefault()}
                         onDragStart={(e) => e.preventDefault()}
                         style={{ 
                           userSelect: 'none', 
                           pointerEvents: 'auto',
                           maxWidth: '100%',
                           height: 'auto'
                         }}
                       />
                     )
                   }
                 }}
               />
             </div>
           </article>
         </div>

         {/* Sidebar */}
         <div className='lg:w-1/3'>
           {/* Quick Actions */}
           <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
             <h3 className='font-semibold text-gray-900 mb-4'>Quick Actions</h3>
             <div className='space-y-3'>
               <button className='flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                 <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                 </svg>
                 <span className='text-sm'>Like Article</span>
               </button>
               <button className='flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                 <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                 </svg>
                 <span className='text-sm'>Save for Later</span>
               </button>
             </div>
           </div>

           {/* Related Posts */}
           <div className='bg-white rounded-lg shadow-sm p-6'>
             <h3 className='font-semibold text-gray-900 mb-4'>Related Posts</h3>
             <div className='space-y-4'>
               {relatedPosts.map((post) => (
                 <div key={post.slug.current} className='flex space-x-3'>
                   <img 
                     src={post.mainImage.asset.url}
                     alt={post.title}
                     className="w-16 h-16 object-cover rounded-lg"
                     onContextMenu={(e) => e.preventDefault()}
                     onDragStart={(e) => e.preventDefault()}
                     style={{ userSelect: 'none', pointerEvents: 'auto' }}
                   />
                   <div className='flex-1'>
                     <h4 className='text-sm font-medium text-gray-900 line-clamp-2 mb-1'>
                       {post.title}
                     </h4>
                     <p className='text-xs text-gray-500'>
                       {post.publishedAt ? formatDate(post.publishedAt) : '2024年11月20日'}
                     </p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </div>
   </main>
  )
}

export default SinglePost