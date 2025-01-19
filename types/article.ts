export type Article = {
  author: string | null; // The author may be null if not provided
  content: string; // Full article content
  description: string; // A short description of the article
  publishedAt: string; // The publication date as an ISO string
  source: {
    id: string | null; // The source ID may be null
    name: string; // The source name
  };
  title: string; // The article's title
  url: string; // The article URL
  urlToImage: string | null; // The article's image URL, which may be null
};
