"use client";

import { Zap, Shield, Layers, BarChart, Headphones, Frame } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function Features() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Zap className="h-4 w-4" />}
                title="Lightning Fast"
                description="Optimized for speed with zero-runtime overhead and maximum efficiency."
            />
            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
                icon={<Shield className="h-4 w-4" />}
                title="Bank-Grade Security"
                description="Enterprise-level encryption and security protocols built into the core."
            />
            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]"
                icon={<Layers className="h-4 w-4" />}
                title="Seamless Integration"
                description="Drop-in compatibility with your existing tech stack and tools."
            />
            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]"
                icon={<BarChart className="h-4 w-4" />}
                title="Advanced Analytics"
                description="Real-time insights and monitoring for data-driven decisions."
            />
            <GridItem
                area="md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]"
                icon={<Headphones className="h-4 w-4" />}
                title="24/7 Support"
                description="Dedicated support team available whenever you need assistance."
            />
            <GridItem
                area="md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]"
                icon={<Frame className="h-4 w-4" />}
                title="Pixel Perfect"
                description="Design systems that scale with your product vision."
            />
        </ul>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-black/40 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 backdrop-blur-md">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-white/10 bg-white/5 p-2 text-white">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                                {title}
                            </h3>
                            <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-white/50">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
