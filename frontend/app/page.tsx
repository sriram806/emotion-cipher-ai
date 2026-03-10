"use client";

import EncryptionConsole from "@/components/EncryptionConsole";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";
import ThreeDModel from "@/components/ThreeDModel";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

import { Sparkles } from "lucide-react";

export default function Home() {

  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleTryDemoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArchitectureClick = () => {
    router.push("/tech");
  };

  useGSAP(() => {

    gsap.from(mainRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(titleRef.current?.children || [], {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      delay: 0.3,
      duration: 0.8
    });

    gsap.to(modelRef.current, {
      y: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  });

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 overflow-x-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-sky-300/40 blur-[140px]" />
        <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-200/30 blur-[140px]" />

        <AnimatedBackgroundObjects />

      </div>


      <main
        ref={mainRef}
        className="relative z-10 flex flex-col w-full space-y-14 md:space-y-16 pt-20 sm:pt-24"
      >

        {/* HEADER */}

        <div className="max-w-7xl mx-auto w-full px-6 pt-6">
          <Header />
        </div>


        {/* ============================= */}
        {/* CONSOLE SECTION */}
        {/* ============================= */}

        <section className="w-full flex items-center justify-center min-h-[70vh] md:min-h-[75vh]">

          <div className="w-full max-w-5xl px-6">
            <EncryptionConsole />
          </div>

        </section>


        {/* ============================= */}
        {/* HERO SECTION */}
        {/* ============================= */}

        <section className="w-full px-6 flex justify-center">

          <div className="w-full max-w-7xl rounded-[2rem] border border-white/60 bg-white/55 backdrop-blur-xl shadow-[0_30px_80px_-35px_rgba(14,116,144,0.55)] overflow-hidden">

            <div className="grid grid-cols-1 xl:grid-cols-12">

              {/* LEFT: STORY + CTA */}

              <div
                ref={titleRef}
                className="xl:col-span-5 px-6 sm:px-10 lg:px-12 py-10 sm:py-12"
              >

                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-800 mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  Cognitive Encryption Layer
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.02] text-slate-900 mb-5">
                  Security That
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                    Feels Your Signal
                  </span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-7">
                  EmotionCipher adapts encryption strength from emotional intent in real time.
                  Instead of static keys only, we blend sentiment confidence and AES-256 to
                  generate dynamic protection for every message.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8 max-w-md">
                  <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                    <p className="text-2xl font-extrabold text-slate-900">98.4%</p>
                    <p className="text-xs text-slate-500 mt-1">Emotion classification confidence</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                    <p className="text-2xl font-extrabold text-slate-900">256-bit</p>
                    <p className="text-xs text-slate-500 mt-1">Adaptive AES key generation</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleTryDemoClick}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                  >
                    Launch Live Demo
                  </button>
                  <button
                    onClick={handleArchitectureClick}
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
                  >
                    View Architecture
                  </button>
                </div>

              </div>


              {/* RIGHT: VISUAL + FLOW */}

              <div data-hide-header-zone="hero-model" className="xl:col-span-7 relative bg-gradient-to-br from-cyan-50/85 via-blue-50/90 to-indigo-100/85 px-6 sm:px-10 py-10 sm:py-12 border-t xl:border-t-0 xl:border-l border-white/60">

                <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl" />

                <div
                  ref={modelRef}
                  className="relative h-[360px] sm:h-[460px] md:h-[560px] lg:h-[620px] w-full flex items-center justify-center"
                >
                  <div className="absolute h-64 w-64 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem] rounded-full bg-cyan-300/40 blur-[100px]" />
                  <div className="relative w-full h-full flex items-center justify-center opacity-85 md:opacity-100">
                    <ThreeDModel />
                  </div>
                  <div className="absolute bottom-6 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70" />
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ============================= */}
        {/* FEATURE CARDS */}
        {/* ============================= */}

        <section className="w-full py-12 md:py-16 px-6 flex justify-center">

          <div className="max-w-7xl w-full">

            {/* Title */}

            <div className="text-center mb-10">

              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                EmotionCipher
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                  Core Features
                </span>
              </h2>

              <p className="text-zinc-600 text-sm md:text-base max-w-xl mx-auto">
                A new generation encryption platform combining artificial intelligence,
                natural language processing and modern cryptography.
              </p>

            </div>


            {/* Cards Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


              {/* Card 1 */}

              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-sky-600 mb-2">
                  Emotion Detection
                </h3>

                <p className="text-sm text-zinc-600">
                  NLP sentiment models analyze emotional tone before encryption,
                  enabling intelligent context-aware security.
                </p>

              </div>


              {/* Card 2 */}

              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  AES-256 Encryption
                </h3>

                <p className="text-sm text-zinc-600">
                  Combines emotion context with AES-256 cryptographic algorithms
                  to produce adaptive encryption keys.
                </p>

              </div>


              {/* Card 3 */}

              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Context-Aware Security
                </h3>

                <p className="text-sm text-zinc-600">
                  Messages require emotional context used during encryption,
                  preventing unauthorized decryption attempts.
                </p>

              </div>


              {/* Card 4 */}

              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-cyan-600 mb-2">
                  AI + Cryptography
                </h3>

                <p className="text-sm text-zinc-600">
                  A hybrid architecture combining machine learning pipelines
                  with modern encryption techniques.
                </p>

              </div>


            </div>

          </div>

        </section>


        {/* FOOTER */}

        <Footer />

      </main>

    </div>

  );
}