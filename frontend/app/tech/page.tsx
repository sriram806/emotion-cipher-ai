"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import ModelStats from "@/components/ModelStats";
import MLPipelineDetails from "@/components/MLPipelineDetails";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const architectureNodes = [
    {
        title: "Input Layer",
        body: "Incoming text enters a sanitized NLP input gateway with payload validation.",
        tone: "from-cyan-500 to-sky-500",
    },
    {
        title: "Emotion Engine",
        body: "Hybrid classifier scores emotional context using custom ML + transformer fallback.",
        tone: "from-blue-500 to-indigo-500",
    },
    {
        title: "Policy Resolver",
        body: "Confidence and sentiment type map into encryption policy thresholds.",
        tone: "from-indigo-500 to-violet-500",
    },
    {
        title: "Key Derivation",
        body: "Context signal is bound to cryptographic salt to derive adaptive key material.",
        tone: "from-violet-500 to-fuchsia-500",
    },
    {
        title: "AES Vault",
        body: "Final message is encrypted through AES-256 with context-locked decryption rules.",
        tone: "from-fuchsia-500 to-rose-500",
    },
];

export default function TechPage() {
    const pageRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const archRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!pageRef.current) return;

        gsap.from(heroRef.current?.children || [], {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
        });

        gsap.fromTo(
            nodeRefs.current,
            { opacity: 0, y: 28, scale: 0.96 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: archRef.current,
                    start: "top 80%",
                },
            }
        );
    }, { scope: pageRef });

    return (
        <div className="relative min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-500/30 font-sans overflow-x-hidden flex flex-col items-center">
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-zinc-50">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-200/40 mix-blend-multiply blur-[120px] animate-mesh-3" />
                <div className="absolute top-[10%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-violet-200/40 mix-blend-multiply blur-[120px] animate-mesh-4" />
                <AnimatedBackgroundObjects />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <main ref={pageRef} className="relative w-full max-w-7xl px-6 py-8 sm:py-12 flex flex-col items-center z-10 flex-1">
                <Header />

                <section ref={heroRef} className="w-full mt-10 text-center">
                    <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
                        Full Architecture Overview
                    </p>
                    <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900">
                        EmotionCipher System Blueprint
                    </h1>
                    <p className="mt-4 text-zinc-600 max-w-3xl mx-auto text-sm sm:text-base">
                        This page shows the complete pipeline from message ingestion to emotion-aware cryptographic sealing,
                        including where machine learning inference and encryption policy binding happen.
                    </p>
                </section>

                <section ref={archRef} className="w-full mt-10 rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-40px_rgba(59,130,246,0.6)]">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 md:gap-2 items-stretch">
                        {architectureNodes.map((node, idx) => (
                            <div key={node.title} className="contents">
                                <div
                                    ref={(el) => { nodeRefs.current[idx] = el; }}
                                    className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 min-h-[170px]"
                                >
                                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${node.tone} mb-4`} />
                                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">{node.title}</h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{node.body}</p>
                                </div>

                                {idx < architectureNodes.length - 1 && (
                                    <div className="hidden md:flex items-center justify-center text-zinc-400">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="w-full mt-8">
                    <ModelStats />
                    <MLPipelineDetails />
                </div>
            </main>

            <Footer />
        </div>
    );
}
