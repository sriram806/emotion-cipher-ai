"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Network, GitBranch, Cpu, Lock, LineChart, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MLPipelineDetails() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        stepsRef.current.forEach((step, index) => {
            if (!step) return;

            gsap.fromTo(step,
                { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                    }
                }
            );
        });
    }, { scope: containerRef });

    const pipelineSteps = [
        {
            title: "Data Acquisition & Processing",
            icon: <Database className="w-6 h-6 text-sky-500" />,
            description: "Over 211,225 Reddit comments form the foundation of the GoEmotions dataset. We aggressively clean this text, removing URLs and enforcing extreme lowercasing to normalize the 28 emotional dimensions.",
            tags: ["Pandas", "NLTK", "Regex"]
        },
        {
            title: "Custom Model Architecting",
            icon: <Network className="w-6 h-6 text-indigo-500" />,
            description: "Using Scikit-Learn, we architected a distinct Pipeline that bridges a TF-IDF Vectorizer (mapping text lexical density into vectors) coupled to a Multinomial Naive Bayes classifier. This operates at near O(1) inference speed.",
            tags: ["Scikit-Learn", "TF-IDF", "Naive Bayes"]
        },
        {
            title: "MLOps Tracking & Serialization",
            icon: <LineChart className="w-6 h-6 text-purple-500" />,
            description: "Every hyperparameter and F1-score accuracy curve is automatically observed by MLflow. The best performing model is seamlessly serialized using joblib into a locked .joblib artifact.",
            tags: ["MLflow", "Joblib", "Experiment Tracking"]
        },
        {
            title: "Hybrid Inference Engine",
            icon: <Cpu className="w-6 h-6 text-amber-500" />,
            description: "If the proprietary Custom ML confidence dips below 60%, the backend inherently routes the inference graph to a heavy HuggingFace Transformers fallback model, guaranteeing zero hallucinated contexts.",
            tags: ["PyTorch", "Transformers", "Loguru"]
        },
        {
            title: "Mathematical Binding",
            icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
            description: "Once the emotional string (e.g., 'joy', 'admiration') is strictly verified, it serves to salt and hash the decryption logic using Python's native Cryptography Fernet toolkit, operating smoothly on AES-256.",
            tags: ["Cryptography", "AES-256", "Fernet"]
        }
    ];

    return (
        <div ref={containerRef} className="w-full max-w-5xl mx-auto mt-0 mb-32 px-4">

            <div className="text-center mb-16">
                <h3 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
                    The Architecture.
                </h3>
                <p className="text-zinc-500 max-w-2xl mx-auto">
                    A transparent look into exactly how the EmotionCipher algorithm takes raw text datasets and turns them into secure, contextually-aware encryption locks.
                </p>
            </div>

            <div className="relative border-l-2 border-zinc-200/60 ml-4 sm:ml-8 md:ml-12 pl-8 sm:pl-12 space-y-12 sm:space-y-16">

                {pipelineSteps.map((step, idx) => (
                    <div
                        key={idx}
                        ref={(el) => { stepsRef.current[idx] = el; }}
                        className="relative"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[45px] sm:-left-[61px] w-12 h-12 rounded-full bg-white border shadow-sm border-zinc-200 flex items-center justify-center z-10">
                            {step.icon}
                        </div>

                        {/* Content Card */}
                        <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h4>
                            <p className="text-zinc-600 mb-6 leading-relaxed">
                                {step.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {step.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
