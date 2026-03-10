"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    BrainCircuit,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
    Workflow,
} from "lucide-react";
import Link from "next/link";

const pillars = [
    {
        title: "Emotion Intelligence",
        description:
            "The NLP layer extracts emotional vectors with confidence scoring before encryption decisions are made.",
        icon: BrainCircuit,
        accent: "from-sky-500 to-blue-500",
    },
    {
        title: "Policy Binding",
        description:
            "Detected sentiment and confidence thresholds are mapped into strict encryption policy bands.",
        icon: Workflow,
        accent: "from-blue-500 to-indigo-500",
    },
    {
        title: "Cryptographic Sealing",
        description:
            "AES-256 key derivation is context-aware, creating payload locks tied to emotional signature state.",
        icon: LockKeyhole,
        accent: "from-indigo-500 to-fuchsia-500",
    },
];

const principles = [
    "Security should adapt to context, not stay static.",
    "Emotion metadata must improve protection, never expose private meaning.",
    "AI decisions and cryptographic boundaries must remain auditable.",
    "Performance and trust are treated as equally critical.",
];

export default function AboutProject() {
    const rootRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const pillarsRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(heroRef.current?.children || [], {
                y: 28,
                opacity: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power2.out",
            });

            gsap.fromTo(
                cardRefs.current,
                { y: 28, opacity: 0, scale: 0.97 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.75,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: pillarsRef.current,
                        start: "top 82%",
                    },
                }
            );

            gsap.from(bottomRef.current?.children || [], {
                y: 24,
                opacity: 0,
                duration: 0.75,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bottomRef.current,
                    start: "top 84%",
                },
            });
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className="w-full max-w-7xl mx-auto mt-14 sm:mt-16">
            <section
                ref={heroRef}
                className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_80px_-45px_rgba(14,116,144,0.55)]"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold tracking-wide text-sky-700">
                    <Sparkles className="w-4 h-4" />
                    About EmotionCipher
                </div>

                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] text-zinc-900">
                    Human Signals,
                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-500 via-blue-500 to-indigo-500">
                        Machine-Grade Security
                    </span>
                </h1>

                <p className="mt-5 max-w-3xl text-zinc-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                    EmotionCipher is a context-aware encryption framework where emotional inference and cryptography work as one system.
                    Instead of treating all messages identically, the protocol adds sentiment intelligence to tune how keys are generated and validated.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                        href="/tech"
                        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View Tech Architecture
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/"
                        className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-sky-300 hover:text-sky-700"
                    >
                        Try Demo
                    </Link>
                </div>
            </section>

            <section ref={pillarsRef} className="mt-7 sm:mt-8">
                <div className="mb-5 sm:mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Core Pillars</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">How The Protocol Works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.title}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="rounded-2xl border border-zinc-200 bg-white/85 backdrop-blur p-5 sm:p-6 shadow-[0_15px_40px_-30px_rgba(14,116,144,0.55)] transition-transform duration-300 hover:-translate-y-1"
                        >
                            <div className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 mb-3">
                                <pillar.icon className="w-4 h-4" />
                            </div>
                            <div className={`h-1.5 w-16 rounded-full bg-linear-to-r ${pillar.accent} mb-4`} />
                            <h3 className="text-lg font-bold text-zinc-900">{pillar.title}</h3>
                            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section ref={bottomRef} className="mt-7 sm:mt-8 grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-zinc-200 bg-white/85 backdrop-blur p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Design Principles</p>
                    <ul className="mt-4 space-y-3">
                        {principles.map((principle) => (
                            <li key={principle} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700">
                                <span className="mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/10 border border-sky-300/60 text-sky-700">
                                    <ShieldCheck className="w-3 h-3" />
                                </span>
                                {principle}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-sky-50/60 to-blue-50/60 p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Project Vision</p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">Empathy Without Exposure</h3>
                    <p className="mt-3 text-zinc-600 text-sm sm:text-base leading-relaxed">
                        The long-term direction is to make emotional context useful for secure systems while preserving personal privacy.
                        EmotionCipher aims to support safer communication in high-trust environments like healthcare, counseling, and secure collaboration.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                        <span className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Context-Aware</span>
                        <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">Privacy-First</span>
                        <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Cryptographically Strong</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
