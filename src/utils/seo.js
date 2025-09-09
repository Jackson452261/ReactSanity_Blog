// SEO utility functions for dynamic meta tag management
export const updateDocumentMeta = (metaData) => {
  // Update document title
  if (metaData.title) {
    document.title = metaData.title;
  }

  // Update or create meta tags
  const updateMetaTag = (name, content, property = false) => {
    if (!content) return;
    
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Update canonical URL
  if (metaData.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metaData.canonical);
  }

  // Standard meta tags
  updateMetaTag('description', metaData.description);
  updateMetaTag('keywords', metaData.keywords);
  updateMetaTag('author', metaData.author);
  updateMetaTag('robots', metaData.robots);

  // Open Graph tags
  updateMetaTag('og:title', metaData.ogTitle, true);
  updateMetaTag('og:description', metaData.ogDescription, true);
  updateMetaTag('og:image', metaData.ogImage, true);
  updateMetaTag('og:url', metaData.ogUrl, true);
  updateMetaTag('og:type', metaData.ogType, true);
  updateMetaTag('og:site_name', metaData.ogSiteName, true);

  // Twitter Card tags
  updateMetaTag('twitter:card', metaData.twitterCard);
  updateMetaTag('twitter:title', metaData.twitterTitle);
  updateMetaTag('twitter:description', metaData.twitterDescription);
  updateMetaTag('twitter:image', metaData.twitterImage);
};

// Generate structured data (JSON-LD)
export const addStructuredData = (data) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// SEO configurations for different page types
export const seoConfigs = {
  home: {
    title: 'Jack網站',
    description: '歡迎來到Jack的旅遊部落格',
    keywords: '旅遊文章,  風景攝影, 部落格文章,',
    author: 'Jack Chen',
    robots: 'index, follow',
    ogType: 'website',
    ogSiteName: 'Jack網站',
    twitterCard: 'summary_large_image'
  },
  
  blog: {
    title: 'Jack網站',
    description: 'Jack的旅遊部落格，分享旅遊照片。',
    keywords: '旅遊文章,  風景攝影, 部落格文章,',
    author: 'Jack Chen',
    robots: 'index, follow',
    ogType: 'website',
    ogSiteName: 'Jack網站',
    twitterCard: 'summary_large_image'
  }
};

// Generate post-specific SEO data
export const generatePostSEO = (post) => {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/post/${post.slug?.current || ''}`;
  
  // Extract keywords from title and description
  const titleKeywords = post.title ? post.title.split(/[\s,，、]+/).filter(word => word.length > 1) : [];
  const locationKeywords = ['台灣', '日本', '馬來西亞', '合歡山', '武陵', 'MotoGP', 'Honda'];
  const travelKeywords = ['旅遊', '風景', '攝影', '探索', '文化', '美食'];
  
  const keywords = [...new Set([...titleKeywords, ...locationKeywords, ...travelKeywords])].join(', ');
  
  return {
    title: `${post.title} | Jack網站 - 旅遊部落格`,
    description: post.description || `探索${post.title}Jack的旅遊部落格，分享旅遊照片。`,
    keywords: `${post.title}, ${keywords}, Jack網站, 旅遊部落格`,
    author: 'Jack Chen',
    robots: 'index, follow',
    canonical: postUrl,
    ogTitle: post.title,
    ogDescription: post.description || `探索${post.title}的精彩旅程`,
    ogImage: post.mainImage?.asset?.url || `${baseUrl}/assets/Logo.png`,
    ogUrl: postUrl,
    ogType: 'article',
    ogSiteName: 'Jack網站',
    twitterCard: 'summary_large_image',
    twitterTitle: post.title,
    twitterDescription: post.description || `探索${post.title}的精彩旅程`,
    twitterImage: post.mainImage?.asset?.url || `${baseUrl}/assets/Logo.png`
  };
};

// Generate structured data for blog posts
export const generatePostStructuredData = (post) => {
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || `探索${post.title}的精彩旅程`,
    "image": post.mainImage?.asset?.url || `${baseUrl}/assets/Logo.png`,
    "author": {
      "@type": "Person",
      "name": post.name || "Jack Chen",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jack網站",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/Logo.png`
      }
    },
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post.publishedAt || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/post/${post.slug?.current || ''}`
    }
  };
};

// Generate structured data for website
export const generateWebsiteStructuredData = () => {
  const baseUrl = window.location.origin;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jack網站",
    "description": "Jack的旅遊部落格，分享旅遊照片",
    "url": baseUrl,
    "author": {
      "@type": "Person",
      "name": "Jack Chen"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/post?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};
