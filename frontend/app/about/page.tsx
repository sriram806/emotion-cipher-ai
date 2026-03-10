import AboutProject from "@/components/AboutProject";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackgroundObjects from "@/components/AnimatedBackgroundObjects";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50 text-zinc-900 selection:bg-indigo-500/30 font-sans overflow-x-hidden flex flex-col items-center">
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-16%] left-[-8%] w-[58vw] h-[58vw] rounded-full bg-sky-300/35 blur-[125px]" />
            <div className="absolute top-[24%] right-[-10%] w-[48vw] h-[48vw] rounded-full bg-blue-300/35 blur-[130px]" />
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.2)_1px,transparent_0)] bg-size-[22px_22px]" />
                <AnimatedBackgroundObjects />
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
