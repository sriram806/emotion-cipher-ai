import AboutProject from "@/components/AboutProject";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-500/30 font-sans overflow-x-hidden flex flex-col items-center">
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-zinc-50">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky-200/50 mix-blend-multiply blur-[120px] animate-mesh-1" />
                <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/50 mix-blend-multiply blur-[120px] animate-mesh-2" />
                <AnimatedBackgroundObjects />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <main className="relative w-full max-w-7xl px-6 py-8 sm:py-12 flex flex-col items-center z-10 flex-1">
                <Header />

                <div className="w-full mt-8">
                    <AboutProject />
                </div>
            </main>

            <Footer />
        </div>
    );
}
