"use client";

import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative w-full h-[100dvh] overflow-hidden bg-black text-white selection:bg-white/20">
            {/* 1. Unicorn Studio Background Layer */}
            <div
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            >
                <UnicornScene
                    projectId="82iIwuFElIwvwza2nGrN"
                    width="100%"
                    height="100%"
                    scale={1}
                    dpi={1.5}
                    fps={60}
                    production={true}
                    sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
            </div>

            {/* 2. Content Overlay: "Black Liquid Glass" Aesthetics */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">

                {/* Glassmorphism Card Container */}
                <div className={`
          relative
          p-8 md:p-12 lg:p-16
          rounded-[2rem] 
          border border-white/10 
          bg-black/20 
          backdrop-blur-xl 
          shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]
          max-w-5xl w-full
          overflow-hidden
          transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
          ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
        `}>

                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />

                    {/* Badge */}
                    <div
                        className={`flex justify-center mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                        <Badge
                            variant="outline"
                            className="px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 border-white/20 bg-white/5 backdrop-blur-md rounded-full shadow-lg"
                        >
                            <span className="flex h-2 w-2 mr-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Identity Architecture v2.0
                        </Badge>
                    </div>

                    {/* Headline */}
                    <h1
                        className={`
              text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter 
              text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50
              mb-8 drop-shadow-sm
              transition-all duration-700 delay-200
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
                    >
                        Don&apos;t Just Verify. <br />
                        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Validate.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className={`
              text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light
              transition-all duration-700 delay-300
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
                    >
                        Deploy strict, high-friction identity verification infrastructures.
                        Engineered for developers who prioritize security over convenience.
                    </p>

                    {/* Buttons */}
                    <div
                        className={`
              flex flex-col sm:flex-row gap-5 justify-center items-center
              transition-all duration-700 delay-500
              ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
                    >
                        <Link href="/signup">
                            <Button
                                size="lg"
                                className="
                  h-14 px-8 text-base font-semibold rounded-full 
                  bg-white text-black 
                  hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300
                  shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]
                "
                            >
                                Start Verification
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                variant="outline"
                                size="lg"
                                className="
                   h-14 px-8 text-base font-semibold rounded-full 
                   border-white/20 bg-white/5 text-white 
                   hover:bg-white/10 hover:border-white/40 hover:text-white
                   transition-all duration-300 backdrop-blur-md
                 "
                            >
                                <Terminal className="mr-2 h-5 w-5" />
                                Live Demo
                            </Button>
                        </Link>
                    </div>

                    {/* Footer Metric or Trust Signal */}
                    <div
                        className={`
               mt-16 pt-8 border-t border-white/5 flex justify-center gap-8 md:gap-16
               transition-all duration-1000 delay-700
               ${mounted ? 'opacity-100' : 'opacity-0'}
             `}
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99.9%</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">&lt;50ms</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Latency</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">Zero</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Breaches</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
