import Hero from "../components/home/Hero";
import CategoryBar from "../components/home/CategoryBar";
import Recommended from "../components/home/Recommended";
import TopGames from "../components/home/TopGames";
import BestSellingEGiftCards from "../components/home/BestSellingEGiftCards";
import BestSellingGiftCards from "../components/home/BestSellingGiftCards";
import UpcomingGames from "../components/home/UpcomingGames";
import Categories from "../components/home/Categories";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryBar />
      <Recommended />
      <TopGames />
      <BestSellingEGiftCards />
      <BestSellingGiftCards />
      <UpcomingGames />
      <Categories />
    </main>
  );
}