"use client";

import { useEffect, useState } from "react";
import { getNews } from "../lib/news";

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [country, setCountry] = useState("us");
  const [isReading, setIsReading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      const news = await getNews(country);
      setArticles(news);
    }
    fetchData();
  }, [country]);

  const readNews = async () => {
    if (!articles.length) return;

    // Combine all headlines into one string
    const text = articles.map((a) => a.title).join(". Next news: ");

    setIsReading(true);

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      console.error("TTS request failed");
      setIsReading(false);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const audioElement = new Audio(url);
    audioElement.play();

    setAudio(audioElement);

    audioElement.onended = () => {
      setIsReading(false);
    };
  };

  const stopReading = () => {
    if (audio) {
      audio.pause();
      setIsReading(false);
    }
  };

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

      <div className="flex gap-4 mb-6">
        {!isReading ? (
          <button
            onClick={readNews}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ▶ Play News
          </button>
        ) : (
          <button
            onClick={stopReading}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            ⏹ Stop
          </button>
        )}
      </div>

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
