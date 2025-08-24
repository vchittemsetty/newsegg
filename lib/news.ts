export async function getNews(country = "us") {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles || [];
}
