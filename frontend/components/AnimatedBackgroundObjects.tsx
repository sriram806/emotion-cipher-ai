"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedBackgroundObjects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const objectsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // Parallax setup for each object
        objectsRef.current.forEach((obj, index) => {
            if (!obj) return;

            // Vary speeds and directions based on index for a more organic feel
            const speed = (index % 3) + 1;
            const yOffset = (index % 2 === 0 ? 1 : -1) * 200 * speed;
            const rotationOffset = (index % 2 === 0 ? 180 : -180);

            gsap.to(obj, {
                y: yOffset,
                rotation: rotationOffset,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5, // Smooth scrubbing
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">

            {/* Object 1: Large Wireframe Sphere (Sky to Violet) */}
            <div
                ref={(el) => { objectsRef.current[0] = el; }}
                className="absolute top-[15%] left-[10%] opacity-40 mix-blend-multiply drop-shadow-sm"
                style={{ width: 120, height: 120 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="gradient-sphere" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#gradient-sphere)" strokeWidth="0.5" />
                    <ellipse cx="50" cy="50" rx="45" ry="15" stroke="url(#gradient-sphere)" strokeWidth="0.5" />
                    <ellipse cx="50" cy="50" rx="15" ry="45" stroke="url(#gradient-sphere)" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Object 2: Floating Cryptographic Ring (Indigo to Fuchsia) */}
            <div
                ref={(el) => { objectsRef.current[1] = el; }}
                className="absolute top-[40%] right-[15%] opacity-30 mix-blend-multiply"
                style={{ width: 150, height: 150 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" stroke="url(#gradient-ring)" strokeWidth="2" strokeDasharray="10 5" />
                    <circle cx="50" cy="50" r="30" stroke="url(#gradient-ring)" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="48" stroke="url(#gradient-ring)" strokeWidth="0.2" />
                </svg>
            </div>

            {/* Object 3: Geometric Shard / Pyramid (Teal to Emerald) */}
            <div
                ref={(el) => { objectsRef.current[2] = el; }}
                className="absolute bottom-[25%] left-[20%] opacity-30 mix-blend-multiply"
                style={{ width: 100, height: 100 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="gradient-pyramid" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                    <polygon points="50,10 90,80 10,80" stroke="url(#gradient-pyramid)" strokeWidth="1" />
                    <line x1="50" y1="10" x2="50" y2="80" stroke="url(#gradient-pyramid)" strokeWidth="1" />
                    <line x1="10" y1="80" x2="50" y2="60" stroke="url(#gradient-pyramid)" strokeWidth="1" />
                    <line x1="90" y1="80" x2="50" y2="60" stroke="url(#gradient-pyramid)" strokeWidth="1" />
                </svg>
            </div>

            {/* Object 4: Abstract Data Node (Rose to Amber) */}
            <div
                ref={(el) => { objectsRef.current[3] = el; }}
                className="absolute top-[70%] right-[30%] opacity-40 mix-blend-multiply"
                style={{ width: 80, height: 80 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="gradient-node" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                    </defs>
                    <rect x="25" y="25" width="50" height="50" stroke="url(#gradient-node)" strokeWidth="1" transform="rotate(45 50 50)" />
                    <circle cx="50" cy="50" r="5" fill="url(#gradient-node)" />
                    <circle cx="50" cy="15" r="2" fill="url(#gradient-node)" />
                    <circle cx="50" cy="85" r="2" fill="url(#gradient-node)" />
                    <circle cx="15" cy="50" r="2" fill="url(#gradient-node)" />
                    <circle cx="85" cy="50" r="2" fill="url(#gradient-node)" />
                    <line x1="50" y1="15" x2="50" y2="25" stroke="url(#gradient-node)" strokeWidth="0.5" />
                    <line x1="50" y1="85" x2="50" y2="75" stroke="url(#gradient-node)" strokeWidth="0.5" />
                    <line x1="15" y1="50" x2="25" y2="50" stroke="url(#gradient-node)" strokeWidth="0.5" />
                    <line x1="85" y1="50" x2="75" y2="50" stroke="url(#gradient-node)" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Object 5: Small background accent (Sky to Transparent) */}
            <div
                ref={(el) => { objectsRef.current[4] = el; }}
                className="absolute top-[20%] right-[35%] opacity-30 mix-blend-multiply"
                style={{ width: 40, height: 40 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <rect x="10" y="10" width="80" height="80" rx="10" stroke="url(#gradient-accent)" strokeWidth="1" />
                    <rect x="25" y="25" width="50" height="50" rx="5" stroke="url(#gradient-accent)" strokeWidth="0.5" />
                </svg>
            </div>

        </div>
    );
}
