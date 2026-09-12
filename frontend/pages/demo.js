import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Demo() {
  return (
    <>
      <Head>
        <title>Live Demo — FinSentiment</title>
      </Head>
      <Navbar />
      <div className="pt-24">
        <DemoSection />
      </div>
      <Footer />
    </>
  );
}