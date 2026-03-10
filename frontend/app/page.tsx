"use client";

import EncryptionConsole from "@/components/EncryptionConsole";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";
import ThreeDModel from "@/components/ThreeDModel";
import Link from "next/link";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

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

          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            <div
              ref={titleRef}
              className="w-full"
            >

              {/* Badge */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 text-sky-700 border border-sky-300/60 shadow-sm text-sm font-semibold mb-6 backdrop-blur">
                <Sparkles className="w-4 h-4" />
                Next-Gen AI Security
              </div>


              {/* TITLE */}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5 text-zinc-900">
                Encryption Guided by
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500">
                  Human Emotion
                </span>
              </h1>


              {/* DESCRIPTION */}

              <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl mb-7">
                EmotionCipher blends sentiment intelligence with AES-256 cryptography,
                creating security that adapts to emotional context without sacrificing
                speed, privacy, or reliability.
              </p>


              {/* FEATURES */}

              <ul className="space-y-3 mb-8">

                <li className="flex items-center gap-3 text-sm md:text-base text-zinc-700">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-300/50 text-sky-600">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  Emotion-aware contextual encryption
                </li>

                <li className="flex items-center gap-3 text-sm md:text-base text-zinc-700">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-300/50 text-indigo-600">
                    <LockKeyhole className="w-4 h-4" />
                  </span>
                  Adaptive AES-256 encryption logic
                </li>

              </ul>


              {/* BUTTONS */}

              <div className="flex gap-4 flex-wrap">

                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Try Encryption
                </Link>

                <Link
                  href="/tech"
                  className="px-6 py-3 rounded-xl border border-zinc-300 bg-white/70 backdrop-blur text-zinc-700 hover:border-sky-400 hover:text-sky-700 hover:bg-white transition-all duration-300"
                >
                  Learn More
                </Link>

              </div>

            </div>


            {/* MODEL PANEL */}

            <div
              ref={modelRef}
              className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] rounded-3xl bg-white/55 border border-white/70 shadow-[0_24px_80px_-30px_rgba(30,64,175,0.45)] backdrop-blur-xl overflow-hidden"
            >

              <div className="absolute -top-10 -left-8 w-44 h-44 rounded-full bg-sky-300/40 blur-3xl" />
              <div className="absolute -bottom-12 -right-8 w-56 h-56 rounded-full bg-indigo-300/35 blur-3xl" />

              <div className="absolute inset-0 scale-[1] sm:scale-[0.94] -translate-x-2 sm:-translate-x-4">
                <ThreeDModel />
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[72%] h-[3px] bg-gradient-to-r from-transparent via-sky-400 to-transparent blur-sm opacity-80" />

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