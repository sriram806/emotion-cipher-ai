"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!textRef.current || !containerRef.current) return;

        // Advanced reveal and scaling animation for the giant text
        gsap.fromTo(
            textRef.current,
            {
                y: 100,
                opacity: 0,
                scale: 0.8,
                rotateX: -45,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    scrub: 1,
                },
            }
        );
    }, { scope: containerRef });

    return (
        <footer
            ref={containerRef}
            className="relative w-full h-[60vh] sm:h-[80vh] flex flex-col items-center justify-end overflow-hidden pb-12 sm:pb-20 mt-32 border-t border-zinc-200 bg-white text-zinc-900 perspective-[1000px]"
        >
            {/* Neon Glow beneath the footer text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full px-6 flex flex-col items-center">

                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12 text-zinc-500 font-medium tracking-widest uppercase text-sm">
                    <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Source Architecture</a>
                    <a href="#" className="hover:text-zinc-900 transition-colors">Developer Portal</a>
                </div>

                <div className="w-full overflow-hidden text-center">
                    <h1
                        ref={textRef}
                        className="text-[12vw] sm:text-[15vw] font-black tracking-tighter leading-none bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-900 bg-clip-text text-transparent origin-bottom"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        HACKATHON
                    </h1>
                </div>

                <div className="w-full max-w-7xl mt-8 mb-4 sm:mb-0 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-zinc-400 font-medium px-4 text-center sm:text-left gap-4 sm:gap-0">
                    <span>© 2026 EMPATHYLINK AI. ALL RIGHTS RESERVED.</span>
                    <span>DESIGNED BY B SRIRAM</span>
                </div>
            </div>
        </footer>
    );
}
