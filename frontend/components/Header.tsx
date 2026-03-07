export default function Header() {
    return (
        <header className="w-full max-w-5xl mx-auto flex justify-between items-center mb-16 px-6 py-4 border border-zinc-200 bg-white/70 backdrop-blur-md relative z-50 sticky top-0 sm:top-4 rounded-b-xl sm:rounded-full shadow-sm shadow-zinc-200/50">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm leading-none mt-0.5">E</span>
                </div>
                <span className="font-semibold tracking-tight text-lg text-zinc-900">EmotionCipher.</span>
            </div>
            <div className="hidden sm:flex items-center space-x-8 text-sm font-medium text-zinc-500">
                <a href="https://huggingface.co/minuva/MiniLMv2-goemotions-v2">
                    <span className="hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                        GoEmotions V2
                    </span>
                </a>
                <a href="https://www.progress.com/blogs/use-aes-256-encryption-secure-data">
                    <span className="hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                        AES-256
                    </span>
                </a>
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    API Connected..
                </div>
            </div>
        </header>
    );
}
