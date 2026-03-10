"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Cpu, Home } from "lucide-react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hideHeaderOnModel, setHideHeaderOnModel] = useState(false);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const hideZone = document.querySelector("[data-hide-header-zone='hero-model']");
        if (!hideZone) {
            setHideHeaderOnModel(false);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideHeaderOnModel(entry.isIntersecting);
            },
            {
                threshold: 0.35,
            }
        );

        observer.observe(hideZone);

        return () => observer.disconnect();
    }, [pathname]);

    useGSAP(() => {
        if (!headerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Header slides down
        tl.fromTo(headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.2 }
        );

        // Logo and Links stagger in
        tl.fromTo([logoRef.current, ...linksRef.current],
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
            "-=0.5"
        );

        // Logo hover effect
        if (logoRef.current) {
            logoRef.current.addEventListener('mouseenter', () => {
                gsap.to(logoRef.current, { rotation: 360, scale: 1.1, duration: 0.5, ease: "back.out(2)" });
            });
            logoRef.current.addEventListener('mouseleave', () => {
                gsap.to(logoRef.current, { rotation: 0, scale: 1, duration: 0.5, ease: "power2.out" });
            });
        }

    }, { scope: headerRef });

    return (
        <div className={`w-full fixed top-0 left-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-300 ${hideHeaderOnModel ? "opacity-0 -translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"}`}>
            <header
                ref={headerRef}
            className={`flex justify-between items-center px-6 py-4 border bg-white/20 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                ? "w-full max-w-6xl mt-2 sm:mt-4 rounded-2xl sm:rounded-full border-white/40 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)]"
                : "w-full max-w-7xl mt-2 sm:mt-4 rounded-2xl sm:rounded-full border-white/35 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)]"
                    }`}
            >
                <div className="flex items-center space-x-3 cursor-pointer group">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setMobileMenuOpen(false)}>
                        <div ref={logoRef} className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center shadow-md shadow-zinc-900/20">
                            <span className="text-white font-bold text-sm leading-none mt-0.5">E</span>
                        </div>
                        <span className="font-semibold tracking-tight text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors">EmotionCipher.</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-500">
                    <Link href="/" ref={(el) => { linksRef.current[0] = el; }}>
                        <span className={`transition-colors flex items-center gap-2 ${pathname === '/' ? 'text-indigo-600' : 'hover:text-zinc-900'}`}>
                            {pathname === '/' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                            <Home className="w-4 h-4" /> Home
                        </span>
                    </Link>
                    <Link href="/about" ref={(el) => { linksRef.current[1] = el; }}>
                        <span className={`transition-colors flex items-center gap-2 ${pathname === '/about' ? 'text-indigo-600' : 'hover:text-zinc-900'}`}>
                            {pathname === '/about' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                            <Code2 className="w-4 h-4" /> About Protocol
                        </span>
                    </Link>
                    <Link href="/tech" ref={(el) => { linksRef.current[2] = el; }}>
                        <span className={`transition-colors flex items-center gap-2 ${pathname === '/tech' ? 'text-indigo-600' : 'hover:text-zinc-900'}`}>
                            {pathname === '/tech' && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                            <Cpu className="w-4 h-4" /> ML Pipeline
                        </span>
                    </Link>

                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm flex items-center gap-2 text-xs font-semibold">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        STATUS: SECURE
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu (Framer Motion) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-4 mx-4 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-zinc-200/80 shadow-2xl flex flex-col space-y-2 md:hidden z-50 overflow-hidden"
                        >
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                                    <Home className="w-5 h-5" /> Home Core
                                </div>
                            </Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${pathname === '/about' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                                    <Code2 className="w-5 h-5" /> About Protocol
                                </div>
                            </Link>
                            <Link href="/tech" onClick={() => setMobileMenuOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${pathname === '/tech' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                                    <Cpu className="w-5 h-5" /> ML Statistics
                                </div>
                            </Link>

                            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between px-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">System Status</span>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm flex items-center gap-2 text-xs font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    SECURE
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}
