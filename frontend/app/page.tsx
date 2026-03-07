"use client";

import EncryptionConsole from "@/components/EncryptionConsole";
import Header from "@/components/Header";
import AboutProject from "@/components/AboutProject";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-500/30 font-sans overflow-x-hidden flex flex-col items-center">
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-zinc-50">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky-200/50 mix-blend-multiply blur-[120px] animate-mesh-1" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/50 mix-blend-multiply blur-[120px] animate-mesh-2" />
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-teal-200/40 mix-blend-multiply blur-[120px] animate-mesh-3" />
        <div className="absolute top-[10%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-violet-200/40 mix-blend-multiply blur-[120px] animate-mesh-4" />
        <AnimatedBackgroundObjects />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-7xl px-6 py-8 sm:py-12 flex flex-col items-center z-10 flex-1"
      >
        <Header />

        {/* Hero & Console Container */}
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh] mt-12 mb-32 relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight text-zinc-900 mb-8 z-10"
          >
            EmotionCipher.
          </motion.h1>
          <EncryptionConsole />
        </div>

        <AboutProject />

      </motion.main>

      <Footer />
    </div>
  );
}