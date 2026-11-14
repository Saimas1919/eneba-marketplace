import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

import Hero from "../components/home/Hero";
import CategoryBar from "../components/home/CategoryBar";
import Recommended from "../components/home/Recommended";
import TopGames from "../components/home/TopGames";
import BestSellingEGiftCards from "../components/home/BestSellingEGiftCards";
import BestSellingGiftCards from "../components/home/BestSellingGiftCards";
import UpcomingGames from "../components/home/UpcomingGames";
import Categories from "../components/home/Categories";

export default function Home() {
  useDocumentTitle("Eneba | Buy Games, Gift Cards & Top-ups");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getHomeData()
      .then(res => { setData(res); setLoading(false); })
      .catch(err => { console.error(err); setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#4618ac] flex items-center justify-center text-white text-xl">Loading Homepage...</div>;
  if (error) return <div className="min-h-screen bg-[#4618ac] flex items-center justify-center text-red-500 text-xl">{error}</div>;
  if (!data) return null;

  const remainingSections = [];
  if (data.topGames?.length > 0) remainingSections.push(<TopGames products={data.topGames} />);
  if (data.bestSellingEGifts?.length > 0) remainingSections.push(<BestSellingEGiftCards products={data.bestSellingEGifts} />);
  if (data.bestSellingGifts?.length > 0) remainingSections.push(<BestSellingGiftCards products={data.bestSellingGifts} />);
  if (data.upcomingGames?.length > 0) remainingSections.push(<UpcomingGames products={data.upcomingGames} />);
  if (data.categories?.length > 0) remainingSections.push(<Categories categories={data.categories} />);

  return (
    <main>
      {data.heroBanners?.length > 0 && <Hero banners={data.heroBanners} />}
      
      {data.categoriesBar?.length > 0 && (
        <div className="w-full bg-[#4618ac]">
          <CategoryBar categories={data.categoriesBar} />
        </div>
      )}

      {data.recommended?.length > 0 && (
        <div className="w-full bg-[#4618ac]">
          <Recommended products={data.recommended} />
        </div>
      )}

      {remainingSections.map((section, index) => {
        const bgColor = index % 2 === 0 ? 'bg-[#311178]' : 'bg-[#4618ac]';
        return (
          <div key={index} className={`w-full ${bgColor}`}>
            {section}
          </div>
        );
      })}
    </main>
  );
}