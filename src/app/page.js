import HeroSection from "../components/HeroSection";
import TickerStrip from "../components/TickerStrip";
import StatsStrip from "../components/StatsStrip";
import VideosSection from "../components/VideosSection";
import ProjectsShelf from "../components/ProjectsShelf";
import StorySection from "../components/StorySection";

export const metadata = {
  title: "Lochan Jangid | Machine Learning Engineer & Educator",
  description:
    "Explore production machine learning systems, from-scratch RAG masterclass, deep transformer experiments, and interactive neural models by Lochan Jangid.",
};

export default function HomePage() {
  return (
    <main id="main-content" className="flex flex-col">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Ticker Strip */}
      <TickerStrip />

      {/* 4. Stats Strip */}
      <StatsStrip />

      {/* 5. Videos Section ("On the channel") */}
      <VideosSection />

      {/* 6. Projects Section ("Lab shelf") */}
      <ProjectsShelf />

      {/* 7. Story/About Section */}
      <StorySection />
    </main>
  );
}
