"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, AlertCircle, Fingerprint, ScanEye, Sparkles, Activity } from "lucide-react";

// Full 28 GoEmotions mapped to optimistic, glassmorphic UI styles
const emotionColors: Record<string, string> = {
    admiration: "text-sky-500 border-sky-500/30 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.2)]",
    amusement: "text-amber-400 border-amber-400/30 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    anger: "text-red-500 border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    annoyance: "text-orange-500 border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]",
    approval: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    caring: "text-rose-400 border-rose-400/30 bg-rose-400/10 shadow-[0_0_15px_rgba(251,113,133,0.2)]",
    confusion: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10 shadow-[0_0_15px_rgba(129,140,248,0.2)]",
    curiosity: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]",
    desire: "text-pink-500 border-pink-500/30 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]",
    disappointment: "text-slate-500 border-slate-500/30 bg-slate-500/10 shadow-[0_0_15px_rgba(100,116,139,0.2)]",
    disapproval: "text-zinc-500 border-zinc-500/30 bg-zinc-500/10 shadow-[0_0_15px_rgba(113,113,122,0.2)]",
    disgust: "text-lime-500 border-lime-500/30 bg-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.2)]",
    embarrassment: "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/10 shadow-[0_0_15px_rgba(232,121,249,0.2)]",
    excitement: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]",
    fear: "text-violet-500 border-violet-500/30 bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    gratitude: "text-teal-400 border-teal-400/30 bg-teal-400/10 shadow-[0_0_15px_rgba(45,212,191,0.2)]",
    grief: "text-slate-600 border-slate-600/30 bg-slate-600/10 shadow-[0_0_15px_rgba(71,85,105,0.2)]",
    joy: "text-amber-300 border-amber-300/30 bg-amber-300/10 shadow-[0_0_15px_rgba(252,211,77,0.2)]",
    love: "text-rose-500 border-rose-500/30 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
    nervousness: "text-violet-400 border-violet-400/30 bg-violet-400/10 shadow-[0_0_15px_rgba(167,139,250,0.2)]",
    optimism: "text-yellow-300 border-yellow-300/30 bg-yellow-300/10 shadow-[0_0_15px_rgba(253,224,71,0.2)]",
    pride: "text-purple-500 border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    realization: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    relief: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.2)]",
    remorse: "text-blue-500 border-blue-500/30 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    sadness: "text-blue-400 border-blue-400/30 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.2)]",
    surprise: "text-sky-400 border-sky-400/30 bg-sky-400/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]",
    neutral: "text-zinc-400 border-zinc-400/30 bg-zinc-400/10 shadow-[0_0_15px_rgba(161,161,170,0.2)]",
};

const emotionEmojis: Record<string, string> = {
    admiration: "🤩", amusement: "😂", anger: "😡", annoyance: "😒", approval: "👍", caring: "🤗",
    confusion: "😕", curiosity: "🤔", desire: "😏", disappointment: "😞", disapproval: "👎", disgust: "🤢",
    embarrassment: "😳", excitement: "🤩", fear: "😨", gratitude: "🙏", grief: "😭", joy: "😊",
    love: "❤️", nervousness: "😬", optimism: "🌟", pride: "😌", realization: "💡", relief: "😮‍💨",
    remorse: "😔", sadness: "😢", surprise: "😲", neutral: "😶"
};

export default function EncryptionConsole() {
    const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const [inputText, setInputText] = useState("");
    const [encryptedText, setEncryptedText] = useState("");
    const [detectedEmotion, setDetectedEmotion] = useState("");
    const [decryptedText, setDecryptedText] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"input" | "encrypted" | "decrypted">("input");

    const BACKEND_URL = "http://127.0.0.1:8000";

    const adjustInputHeight = () => {
        const textarea = inputTextAreaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        adjustInputHeight();
    }, [inputText]);

    const handleEncrypt = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BACKEND_URL}/encrypt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: inputText }),
            });

            if (!res.ok) throw new Error("Failed to connect to AI server");

            const data = await res.json();
            setEncryptedText(data.encrypted_text);
            setDetectedEmotion(data.emotion);
            setMode("encrypted");
        } catch (err) {
            setError("Failed to encrypt message. server is down?");
        } finally {
            setLoading(false);
        }
    };

    const handleDecrypt = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BACKEND_URL}/decrypt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    encrypted_text: encryptedText,
                    emotion: detectedEmotion
                }),
            });

            if (!res.ok) throw new Error("Failed to decrypt");

            const data = await res.json();
            setDecryptedText(data.message);
            setMode("decrypted");
        } catch (err) {
            setError("Decryption failed. Invalid payload.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setInputText("");
        setEncryptedText("");
        setDetectedEmotion("");
        setDecryptedText("");
        setMode("input");
    };

    const renderEmotions = (emotionsString: string) => {
        if (!emotionsString) return null;
        const emotions = emotionsString.split("+").map(e => e.trim().toLowerCase());

        return (
            <div className="flex flex-wrap gap-4 justify-center mt-6">
                {emotions.map((emo, idx) => {
                    const badgeStyle = emotionColors[emo] || emotionColors.neutral;
                    const badgeEmoji = emotionEmojis[emo] || emotionEmojis.neutral;
                    return (
                        <motion.div
                            key={emo + idx}
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ delay: idx * 0.15, type: "spring", stiffness: 200, damping: 15 }}
                            className={`flex items-center space-x-3 px-5 py-2.5 rounded-2xl border ${badgeStyle} glass-panel shadow-xl`}
                        >
                            <span className="text-2xl drop-shadow-md">{badgeEmoji}</span>
                            <span className="font-semibold text-zinc-900 tracking-wide capitalize text-base">{emo}</span>
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative z-20">

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute -top-20 flex items-center space-x-3 text-red-500 bg-red-500/10 border border-red-500/30 px-5 py-3 rounded-2xl text-sm font-semibold backdrop-blur-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {mode === "input" && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]"
                    >
                        <div className="text-center space-y-4 mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900"
                            >
                                How can I help you encrypt?
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                className="text-base text-zinc-500 max-w-2xl mx-auto"
                            >
                                Enter a message to mathematically encode its underlying emotion utilizing the EmotionCipher AES-256 standard protocol.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                            className="w-full relative group z-10 px-4 sm:px-0 max-w-4xl mx-auto"
                        >
                            {/* Minimalist AI Prompt UI (OpenAI / Gemini / Grok inspired) */}
                            <div className="relative w-full bg-white rounded-3xl p-2 flex flex-col sm:flex-row items-end sm:items-center transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200 group-focus-within:ring-zinc-300 group-focus-within:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.12)]">

                                <textarea
                                    ref={inputTextAreaRef}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Message EmotionCipher..."
                                    className="w-full bg-transparent border-none px-6 py-4 sm:py-5 text-lg font-normal text-zinc-900 placeholder:text-zinc-500 focus:outline-none resize-none min-h-15 overflow-hidden hide-scrollbar sm:min-h-auto rounded-3xl"
                                    rows={1}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleEncrypt();
                                        }
                                    }}
                                />

                                <div className="p-2 flex justify-end">
                                    <button
                                        onClick={handleEncrypt}
                                        disabled={loading || !inputText.trim()}
                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-700 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:active:scale-100 disabled:cursor-not-allowed shrink-0"
                                        title="Send message"
                                    >
                                        {loading ? (
                                            <Activity className="w-5 h-5 animate-pulse" />
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="text-center mt-3 text-xs text-zinc-500 font-medium">
                                EmotionCipher can make mistakes. Check important emotional analysis.
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {mode === "encrypted" && (
                    <motion.div
                        key="encrypted"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-3xl mx-auto space-y-8"
                    >

                        {/* Encrypted Box */}
                        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

                            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-semibold">
                                <Lock className="w-5 h-5" />
                                Encrypted Message
                            </div>

                            <p className="font-mono text-lg text-gray-800 break-all">
                                {encryptedText}
                            </p>

                        </div>

                        {/* Emotion Section */}
                        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">

                            <div className="flex items-center gap-2 text-teal-600 mb-4 font-semibold">
                                <ScanEye className="w-5 h-5" />
                                Detected Emotion
                            </div>

                            {renderEmotions(detectedEmotion)}

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4">

                            <button
                                onClick={reset}
                                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                            >
                                Reset
                            </button>

                            <button
                                onClick={handleDecrypt}
                                disabled={loading}
                                className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                {loading ? "Decrypting..." : "Decrypt Message"}
                            </button>

                        </div>

                    </motion.div>
                )}

                {mode === "decrypted" && (
                    <motion.div
                        key="decrypted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-3xl mx-auto space-y-8"
                    >

                        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 text-center">

                            <div className="flex justify-center mb-4 text-green-600 font-semibold gap-2">
                                <Unlock className="w-5 h-5" />
                                Decrypted Message
                            </div>

                            <p className="text-2xl font-semibold text-gray-800">
                                {decryptedText}
                            </p>

                        </div>

                        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 text-center">

                            <div className="flex justify-center gap-2 text-gray-600 mb-4">
                                <Activity className="w-4 h-4" />
                                Emotion
                            </div>

                            {renderEmotions(detectedEmotion)}

                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={reset}
                                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                New Message
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
