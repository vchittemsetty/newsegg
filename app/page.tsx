"use client"; // makes this a client component

import { useEffect, useState } from "react";
import { getNews } from "../lib/news";

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [country, setCountry] = useState("us");

  useEffect(() => {
    async function fetchData() {
      const news = await getNews(country);
      setArticles(news);
    }
    fetchData();
  }, [country]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">News Aggregator 📰</h1>

      <select
        className="border p-2 mb-4"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
      >
        <option value="us">USA</option>
        <option value="gb">UK</option>
        <option value="in">India</option>
        <option value="au">Australia</option>
      </select>

      <div className="space-y-4">
        {articles.map((article, i) => (
          <div key={i} className="border-b pb-4">
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
