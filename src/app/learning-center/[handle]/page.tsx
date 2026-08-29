import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ARTICLES, Article } from "@/lib/data/articles";
import { ArticleViewer } from "@/components/blog/ArticleViewer";

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    handle: art.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { handle } = await params;
  const article = ARTICLES.find((a) => a.slug === handle);

  if (!article) {
    return {
      title: "Article Not Found | Online Land Sales",
      description: "The requested land buying guide could not be found.",
    };
  }

  const title = article.seoTitle || `${article.title} | Online Land Sales`;
  const description = article.summary;

  return {
    title,
    description,
    keywords: [
      "how seller financing land works",
      "owner financed land",
      "seller financing vacant land",
      "buy land with seller financing",
      "land contract vs deed of trust",
      "owner financing land no credit check",
      "promissory note for land",
      "buying land without bank",
      "online land sales"
    ],
    authors: [{ name: article.author?.name || "Online Land Sales Team" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.lastUpdated || article.date,
      authors: [article.author?.name || "Online Land Sales"],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `https://onlinelandsales.com/learning-center/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { handle } = await params;
  const article = ARTICLES.find((a) => a.slug === handle);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== handle).slice(0, 3);

  // Schema.org Article Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: [article.coverImage],
    datePublished: article.date,
    dateModified: article.lastUpdated || article.date,
    author: {
      "@type": "Organization",
      name: article.author?.name || "Online Land Sales",
      url: "https://onlinelandsales.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Online Land Sales",
      logo: {
        "@type": "ImageObject",
        url: "https://onlinelandsales.com/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://onlinelandsales.com/learning-center/${article.slug}`
    }
  };

  // Schema.org FAQPage Structured Data (if FAQs exist)
  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  // Schema.org Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://onlinelandsales.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learning Center",
        item: "https://onlinelandsales.com/learning-center"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://onlinelandsales.com/learning-center/${article.slug}`
      }
    ]
  };

  return (
    <>
      {/* Inject Structured Data for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Main Blog Article Viewer */}
      <ArticleViewer article={article} relatedArticles={relatedArticles} />
    </>
  );
}
