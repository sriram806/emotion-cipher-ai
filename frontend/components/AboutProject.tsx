"use client";

import { useRef } from "react";
import { Zap, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutProject() {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // 1. Text Statement Stagger
        gsap.fromTo(
            elementsRef.current[0],
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elementsRef.current[0],
                    start: "top 85%",
                }
            }
        );

        // 2. Left Tech Stack Card (Frontend) - Slide from left
        gsap.fromTo(
            elementsRef.current[1],
            { x: -80, opacity: 0, rotationY: -15 },
            {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elementsRef.current[1],
                    start: "top 80%",
                }
            }
        );

        // 3. Right Tech Stack Card (Backend) - Slide from right
        gsap.fromTo(
            elementsRef.current[2],
            { x: 80, opacity: 0, rotationY: 15 },
            {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elementsRef.current[2],
                    start: "top 80%",
                }
            }
        );

        // 4. Developer Profile - Scale up spring
        gsap.fromTo(
            elementsRef.current[3],
            { scale: 0.8, opacity: 0, y: 40 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: elementsRef.current[3],
                    start: "top 85%",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full max-w-6xl mx-auto mt-20 pt-20 border-t border-zinc-200/50 dark:border-white/5 space-y-24">
            {/* Project Statement Area */}
            <div ref={(el) => { elementsRef.current[0] = el; }} className="text-center">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide mb-6">
                    <Sparkles className="w-4 h-4 mr-2" /> Emotion-Aware Encryption
                </div>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white mb-8">
                    Understanding emotions, protecting data.
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                    EmpathyLink AI is an intelligent cryptographic protocol that encodes and decodes human emotions hidden within text messages.
                    Designed for environments where emotional context is critical but data privacy is paramount, the system accurately extracts
                    28 unique emotional signatures and mathematically binds them to an AES-256 encryption key. The final payload can only be
                    deciphered if the system recognizes the exact emotional state preserved at the time of encryption.
                </p>
            </div>

            {/* Divided Tech Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Frontend Stack */}
                <div
                    ref={(el) => { elementsRef.current[1] = el; }}
                    className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col items-start"
                >
                    <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-900 flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">Frontend Architecture</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">Next.js & React Core</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">Powers the core interface leveraging server-side rendering for optimal routing and performance.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">Tailwind CSS Minimalism</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">Utilization of clean, flat utility classes and subtle borders for a premium, distraction-free UI.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">GSAP & Framer Motion</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">Provides cinematic viewport scroll animations via GSAP and dynamic state transitions via Framer Motion.</span>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Backend Stack */}
                <div
                    ref={(el) => { elementsRef.current[2] = el; }}
                    className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col items-start"
                >
                    <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-900 flex-shrink-0">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">Backend & AI Pipeline</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">FastAPI (Python)</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">High-performance ASGI server handling the asynchronous encryption routes and NLP model interfacing.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">GoEmotions NLP Model</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">Transformers implementation of `roberta-base-go_emotions` extracting data from 28 neural emotion classes.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-zinc-400 mr-4" />
                            <div>
                                <strong className="text-zinc-900 block mb-1">Fernet Cryptography</strong>
                                <span className="text-zinc-500 text-sm leading-relaxed">Symmetric-key AES-256 layer that converts emotional extraction arrays directly into unbreakable data vaults.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Developer Profile */}
            <div
                ref={(el) => { elementsRef.current[3] = el; }}
                className="w-full flex flex-col items-center justify-center pt-8 px-2 sm:px-4"
            >
                <div className="bg-white px-6 sm:px-12 py-8 sm:py-12 rounded-[2rem] border border-zinc-200 shadow-sm text-center max-w-2xl w-full flex flex-col items-center">

                    <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 mb-2 tracking-tight">Built by B SRIRAM</h3>
                    <p className="text-sm sm:text-base text-zinc-500 font-medium mb-8">AI Engineer & Full Stack Visionary</p>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                        <a href="https://github.com/sriram806" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-zinc-100 text-zinc-900 font-medium text-sm hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center border border-zinc-200">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/sriram-boddu-655ba8310/" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full bg-zinc-100 text-zinc-900 font-medium text-sm hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center border border-zinc-200">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full border border-zinc-200 text-zinc-900 font-medium text-sm bg-zinc-100 hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
