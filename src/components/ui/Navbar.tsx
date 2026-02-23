"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { KineLogo } from "@/components/ui/KineLogo";
import { CommandSearch, useIsMac } from "@/components/ui/CommandSearch";
import { StarCount } from "@/components/ui/StarCount";

export function Navbar() {
    const [stars, setStars] = useState<number | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const isMac = useIsMac();

    useEffect(() => {
        fetch("/api/stars")
            .then(r => r.json())
            .then(d => { if (d.stars !== null) setStars(d.stars); })
            .catch(() => { });
    }, []);

    // Global Ctrl+K / Cmd+K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">

                    {/* Left Side: Brand Panel */}
                    <div className="flex items-center h-full">
                        {/* Mono Logo */}
                        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 pr-6 border-r border-white/5 h-full">
                            <KineLogo className="w-6 h-6 text-white" />
                            <span className="font-mono font-semibold tracking-widest text-[13px] uppercase">
                                [ Kine UI ]
                            </span>
                        </Link>

                        {/* Nav Links */}
                        <nav className="hidden md:flex items-center h-full">
                            <Link href="/docs/installation" className="px-6 flex items-center h-full border-r border-white/5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                Documentation
                            </Link>
                            <Link href="/docs/air-cursor" className="px-6 flex items-center h-full border-r border-white/5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                Gestures
                            </Link>
                        </nav>
                    </div>

                    {/* Right Side: Search & Social Panel */}
                    <div className="flex items-center h-full">

                        {/* Search Trigger */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hidden lg:flex items-center h-full border-l border-white/5 px-4 bg-transparent cursor-pointer group w-[280px] hover:bg-white/[0.02] transition-colors"
                        >
                            <span className="text-emerald-500 font-mono text-xs mr-2">{`>`}</span>
                            <span className="text-xs text-neutral-500 font-mono flex-1 text-left group-hover:text-neutral-400 transition-colors">Search...</span>
                            <div className="flex items-center gap-1">
                                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white/5 px-1.5 font-mono text-[10px] font-medium text-neutral-500 border border-white/10">
                                    {isMac ? "⌘" : "Ctrl"}
                                </kbd>
                                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white/5 px-1.5 font-mono text-[10px] font-medium text-neutral-500 border border-white/10">
                                    K
                                </kbd>
                            </div>
                        </button>

                        {/* GitHub + Stars */}
                        <Link
                            href="https://github.com/open-dev-society/kine-ui"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center border-l border-white/5 h-full px-4 hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                        >
                            <Github className="w-4 h-4" />
                            {stars !== null && (
                                <span className="ml-2">
                                    <StarCount count={stars} delay={500} />
                                </span>
                            )}
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </div>

                </div>
            </header>

            {/* Command Search Modal */}
            <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
