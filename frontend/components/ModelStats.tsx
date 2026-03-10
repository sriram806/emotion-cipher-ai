"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Network, BrainCircuit, Activity } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ModelStats() {
    const containerRef = useRef<HTMLDivElement>(null);
    const counterRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const statsData = [
        {
            icon: <Database className="w-8 h-8 text-indigo-500" />,
            endValue: 211225,
            label: "Labeled Texts",
            description: "GoEmotions robust datasets processed securely.",
            suffix: "+",
        },
        {
            icon: <Network className="w-8 h-8 text-emerald-500" />,
            endValue: 28,
            label: "Emotion Dimensions",
            description: "Nuanced sentiments scientifically extracted.",
            suffix: "",
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
            endValue: 2,
            label: "AI Models Ensembled",
            description: "Custom Scikit-Learn Pipeline + Transformers.",
            suffix: "",
        },
        {
            icon: <Activity className="w-8 h-8 text-rose-500" />,
            endValue: 256,
            label: "Bit AES Encryption",
            description: "High-grade Fernet symmetric cryptography.",
            suffix: "-bit",
        }
    ];

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container fade up
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

        // Cards stagger animation
        gsap.fromTo(cardsRef.current,
            { opacity: 0, scale: 0.9, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

        // Number Counter Animation
        counterRefs.current.forEach((counterEl, index) => {
            if (!counterEl) return;
            const endValue = statsData[index].endValue;

            gsap.fromTo(counterEl,
                { textContent: "0" },
                {
                    textContent: endValue,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                    modifiers: {
                        textContent: function (value) {
                            return Math.floor(value).toLocaleString();
                        }
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full max-w-6xl mx-auto mt-24 mb-16 px-4">

            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-900 mb-6">
                    Powered by world-class MLOps.
                </h2>
                <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                    A completely custom hybrid ML approach prioritizing absolute data privacy, leveraging the most sophisticated emotional datasets available.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {statsData.map((stat, idx) => (
                    <div
                        key={idx}
                        ref={(el) => { cardsRef.current[idx] = el; }}
                        className="bg-white border border-zinc-200/60 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 shadow-sm border border-zinc-100">
                            {stat.icon}
                        </div>

                        <div className="flex items-baseline justify-center mb-2">
                            <h3
                                ref={(el) => { counterRefs.current[idx] = el; }}
                                className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900"
                            >
                                0
                            </h3>
                            <span className="text-2xl font-semibold text-zinc-400 ml-1">{stat.suffix}</span>
                        </div>

                        <div className="font-semibold text-zinc-900 text-lg mb-2">{stat.label}</div>
                        <p className="text-sm text-zinc-500">{stat.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
