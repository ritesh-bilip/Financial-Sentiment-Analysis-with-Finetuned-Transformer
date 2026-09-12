import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>FinSentiment — AI-Powered Financial Sentiment Analysis</title>
        <meta name="description" content="Real-time sentiment analysis on financial news with fine-tuned FinBERT." />
      </Head>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      <DemoSection />
      <Footer />
    </>
  );
}