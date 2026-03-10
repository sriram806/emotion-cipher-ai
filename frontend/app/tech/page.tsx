"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight,
    BrainCircuit,
    Cpu,
    FileText,
    Github,
    Linkedin,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
    Workflow,
} from "lucide-react";
import ModelStats from "@/components/ModelStats";
import MLPipelineDetails from "@/components/MLPipelineDetails";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const architectureNodes = [
    {
        title: "Input Layer",
        body: "Incoming text enters a sanitized NLP input gateway with payload validation.",
        tone: "from-cyan-500 to-sky-500",
        icon: Workflow,
    },
    {
        title: "Emotion Engine",
        body: "Hybrid classifier scores emotional context using custom ML + transformer fallback.",
        tone: "from-blue-500 to-indigo-500",
        icon: BrainCircuit,
    },
    {
        title: "Policy Resolver",
        body: "Confidence and sentiment type map into encryption policy thresholds.",
        tone: "from-indigo-500 to-violet-500",
        icon: Cpu,
    },
    {
        title: "Key Derivation",
        body: "Context signal is bound to cryptographic salt to derive adaptive key material.",
        tone: "from-violet-500 to-fuchsia-500",
        icon: ShieldCheck,
    },
    {
        title: "AES Vault",
        body: "Final message is encrypted through AES-256 with context-locked decryption rules.",
        tone: "from-fuchsia-500 to-rose-500",
        icon: LockKeyhole,
    },
];

export default function TechPage() {
    const pageRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const archRef = useRef<HTMLDivElement>(null);
    const insightsRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!pageRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        gsap.from(heroRef.current?.children || [], {
            opacity: 0,
            y: 28,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
        });

        gsap.to(glowRef.current, {
            x: 30,
            y: -24,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
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

        gsap.fromTo(
            sectionRefs.current,
            { opacity: 0, y: 26 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: insightsRef.current,
                    start: "top 82%",
                },
            }
        );
    }, { scope: pageRef });

    return (

        <>
            <div className="relative min-h-screen top-10 bg-linear-to-br from-cyan-50 via-white to-indigo-50 text-zinc-900 selection:bg-indigo-500/30 font-sans overflow-x-hidden flex flex-col items-center">
                <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div ref={glowRef} className="absolute top-[-14%] left-[-8%] w-[54vw] h-[54vw] rounded-full bg-cyan-300/35 blur-[120px]" />
                    <div className="absolute top-[14%] right-[-12%] w-[45vw] h-[45vw] rounded-full bg-indigo-300/30 blur-[130px]" />
                    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.22)_1px,transparent_0)] bg-size-[22px_22px]" />
                    <AnimatedBackgroundObjects />
                </div>

                <main ref={pageRef} className="relative w-full max-w-7xl px-6 py-8 sm:py-12 flex flex-col items-center z-10 flex-1">
                    <Header />

                    <section ref={heroRef} className="w-full mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-stretch">
                        <div className="rounded-3xl border border-white/70 bg-white/75 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_70px_-42px_rgba(14,116,144,0.55)]">
                            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-700">
                                <Sparkles className="w-3.5 h-3.5" />
                                Full Architecture Overview
                            </p>

                            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.03]">
                                EmotionCipher
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-500 via-indigo-500 to-fuchsia-500">
                                    Technology Core
                                </span>
                            </h1>

                            <p className="mt-5 text-zinc-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                                Explore the end-to-end flow from message ingestion to emotion-locked AES encryption.
                                The pipeline fuses machine learning inference with cryptographic policy resolution for
                                context-aware security.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">NLP + Transformer</span>
                                <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">Adaptive Policy</span>
                                <span className="rounded-lg border border-fuchsia-200 bg-fuchsia-50 px-3 py-1.5 text-xs font-medium text-fuchsia-700">AES-256 Secure</span>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5">
                                    Back to Home
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link href="/about" className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-700">
                                    About Project
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-cyan-100 bg-linear-to-br from-cyan-50/80 via-white to-indigo-50/80 p-6 sm:p-8 shadow-[0_20px_70px_-45px_rgba(79,70,229,0.55)]">
                            <h2 className="text-lg sm:text-xl font-bold text-zinc-900">Pipeline Signals</h2>
                            <p className="text-sm text-zinc-600 mt-1">How emotion metadata transforms into cryptographic control.</p>

                            <div className="mt-5 space-y-3">
                                <div className="rounded-xl border border-cyan-100 bg-white/90 p-3.5">
                                    <p className="text-xs uppercase tracking-wide text-cyan-700 font-semibold">Input Confidence</p>
                                    <p className="text-sm text-zinc-600 mt-1">Semantic validity and tone extraction confidence are computed before policy mapping.</p>
                                </div>
                                <div className="rounded-xl border border-indigo-100 bg-white/90 p-3.5">
                                    <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Policy Weighting</p>
                                    <p className="text-sm text-zinc-600 mt-1">Emotion class and confidence thresholds select encryption strictness bands.</p>
                                </div>
                                <div className="rounded-xl border border-fuchsia-100 bg-white/90 p-3.5">
                                    <p className="text-xs uppercase tracking-wide text-fuchsia-700 font-semibold">Context Lock</p>
                                    <p className="text-sm text-zinc-600 mt-1">AES key derivation binds encrypted payload to sentiment-aware context tokens.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section ref={archRef} className="w-full mt-10 rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-40px_rgba(59,130,246,0.6)]">
                        <div className="mb-6 sm:mb-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">System Flow</p>
                            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">Architecture Path</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 md:gap-2 items-stretch">
                            {architectureNodes.map((node, idx) => (
                                <div key={node.title} className="contents">
                                    <div
                                        ref={(el) => { nodeRefs.current[idx] = el; }}
                                        className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 min-h-44 transition-transform duration-300 hover:-translate-y-1"
                                    >
                                        <div className="mb-3 inline-flex w-8 h-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700">
                                            <node.icon className="w-4 h-4" />
                                        </div>
                                        <div className={`h-1.5 w-16 rounded-full bg-linear-to-r ${node.tone} mb-4`} />
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

                    <section ref={insightsRef} className="w-full mt-10 grid grid-cols-1 gap-6">
                        <div
                            ref={(el) => {
                                sectionRefs.current[0] = el;
                            }}
                            className="rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur-md p-5 sm:p-7 shadow-[0_18px_45px_-35px_rgba(8,47,73,0.6)]"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 mb-3">Model Intelligence</p>
                            <ModelStats />
                        </div>

                        <div
                            ref={(el) => {
                                sectionRefs.current[1] = el;
                            }}
                            className="rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur-md p-5 sm:p-7 shadow-[0_18px_45px_-35px_rgba(30,27,75,0.6)]"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 mb-3">Inference Workflow</p>
                            <MLPipelineDetails />
                        </div>
                    </section>

                    <section className="w-full mt-8 rounded-2xl border border-zinc-200 bg-white/80 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-zinc-900">Built for adaptive, context-safe communication</h3>
                            <p className="text-sm text-zinc-600 mt-1">Emotion-aware policies improve trust boundaries without sacrificing cryptographic rigor.</p>
                        </div>
                        <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800">
                            Run Demo
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </section>

                    <section className="w-full mt-6 rounded-2xl border border-zinc-200 bg-white/85 backdrop-blur px-6 py-6 sm:px-7 sm:py-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Developer Details</p>
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">B SRIRAM</h3>
                                <p className="text-sm text-zinc-600 mt-1">AI Engineer and Full Stack Developer</p>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                <a
                                    href="https://github.com/sriram806"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
                                >
                                    <Github className="w-4 h-4" />
                                    GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/sriram-boddu-655ba8310/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-sky-300 hover:text-sky-700"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </a>

                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                                >
                                    <FileText className="w-4 h-4" />
                                    Resume
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
