"use client";

import EncryptionConsole from "@/components/EncryptionConsole";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";
import ThreeDModel from "@/components/ThreeDModel";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Sparkles } from "lucide-react";

export default function Home() {

  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

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
      y: 12,
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
        className="relative z-10 flex flex-col w-full space-y-14 md:space-y-16"
      >

        {/* HEADER */}

        <div className="max-w-7xl mx-auto w-full px-6 pt-6">
          <Header />
        </div>


        {/* ============================= */}
        {/* CONSOLE */}
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

          <div className="max-w-7xl w-full flex flex-col items-start">

            <div
              ref={titleRef}
              className="w-full max-w-xl"
            >

              {/* Badge */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600 border border-sky-400/30 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Next-Gen AI Security
              </div>


              {/* MODEL UNDER BADGE */}

              <div
                ref={modelRef}
                className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] mb-6 flex items-center justify-center"
              >

                {/* Glow */}

                <div className="absolute w-[240px] sm:w-[300px] md:w-[360px]
                h-[240px] sm:h-[300px] md:h-[360px]
                bg-sky-300/30 blur-[110px] rounded-full" />

                {/* Model */}

                <div className="absolute inset-0 scale-[0.95] -translate-x-6 md:-translate-x-10">
                  <ThreeDModel />
                </div>

                {/* Bottom line */}

                <div className="absolute bottom-2 w-[70%] h-[3px]
                bg-gradient-to-r from-transparent via-sky-400 to-transparent
                blur-sm opacity-70" />

              </div>


              {/* TITLE */}

              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">

                Encryption Guided by

                <span className="block text-transparent bg-clip-text text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500">
                  Emotion
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-6">
                EmotionCipher introduces intelligent encryption where emotional
                context becomes part of the security model. By combining NLP
                sentiment detection with AES-256 encryption, communication
                becomes adaptive, secure and context-aware.
              </p>


              {/* FEATURES */}

              <ul className="space-y-3 mb-6">

                <li className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-1 w-2 h-2 rounded-full bg-sky-500" />
                  Emotion-aware contextual encryption
                </li>

                <li className="flex items-start gap-3 text-sm text-zinc-700">
                  <span className="mt-1 w-2 h-2 rounded-full bg-purple-500" />
                  Adaptive AES-256 encryption logic
                </li>

              </ul>


              {/* BUTTONS */}

              <div className="flex gap-4 flex-wrap">

                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition">
                  Try Encryption
                </button>

                <button className="px-6 py-3 rounded-xl border border-zinc-300 hover:border-sky-400 text-zinc-700 hover:text-sky-600 transition">
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* ============================= */}
        {/* FEATURE CARDS */}
        {/* ============================= */}

        <section className="w-full py-12 md:py-16 px-6 flex justify-center">

          <div className="max-w-7xl w-full">

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


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-sky-600 mb-2">
                  Emotion Detection
                </h3>

                <p className="text-sm text-zinc-600">
                  NLP sentiment models analyze emotional tone before encryption,
                  enabling intelligent context-aware security.
                </p>

              </div>


              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  AES-256 Encryption
                </h3>

                <p className="text-sm text-zinc-600">
                  Combines emotion context with AES-256 cryptographic algorithms
                  to produce adaptive encryption keys.
                </p>

              </div>


              <div className="p-6 bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition">

                <h3 className="text-lg font-semibold text-purple-600 mb-2">
                  Context-Aware Security
                </h3>

                <p className="text-sm text-zinc-600">
                  Messages require emotional context used during encryption,
                  preventing unauthorized decryption attempts.
                </p>

              </div>


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