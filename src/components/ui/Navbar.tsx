"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X, Terminal, Layers, MousePointer2, ArrowRight } from "lucide-react";
import { KineLogo } from "@/components/ui/KineLogo";
import { CommandSearch, useIsMac } from "@/components/ui/CommandSearch";
import { StarCount } from "@/components/ui/StarCount";

export function Navbar() {
    const [stars, setStars] = useState<number | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMac = useIsMac();
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const isActive = (path: string) => pathname === path;

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

                        {/* Nav Links (desktop only) */}
                        <nav className="hidden md:flex items-center h-full">
                            <Link href="/docs/installation" className="px-6 flex items-center h-full border-r border-white/5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                Documentation
                            </Link>
                            <Link href="/docs/air-cursor" className="px-6 flex items-center h-full border-r border-white/5 text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
                                Gestures
                            </Link>
                        </nav>
                    </div>

                    {/* Right Side: Search & Social & Mobile Toggle */}
                    <div className="flex items-center h-full">

                        {/* Search Trigger (desktop only) */}
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

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            className="md:hidden flex items-center justify-center border-l border-white/5 h-full px-4 hover:bg-white/5 transition-colors text-neutral-400 hover:text-white"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-14 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <nav className="relative z-10 bg-[#0a0a0a] border-b border-white/10 overflow-y-auto max-h-[calc(100vh-3.5rem)] shadow-2xl">
                        <div className="p-6 space-y-6">

                            {/* Main Nav */}
                            <div className="space-y-1">
                                <Link
                                    href="/docs/installation"
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-colors ${isActive("/docs/installation") ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                >
                                    <Terminal className="w-4 h-4" />
                                    Documentation
                                </Link>
                                <Link
                                    href="/docs/air-cursor"
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono transition-colors ${isActive("/docs/air-cursor") ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                >
                                    <MousePointer2 className="w-4 h-4" />
                                    Gestures
                                </Link>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* Getting Started Section */}
                            <div>
                                <h4 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3 px-4">Getting Started</h4>
                                <div className="space-y-1">
                                    <Link
                                        href="/docs/installation"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/installation") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <Terminal className="w-4 h-4" />
                                        Installation
                                    </Link>
                                    <Link
                                        href="/docs/architecture"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/architecture") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <Layers className="w-4 h-4" />
                                        Architecture
                                    </Link>
                                </div>
                            </div>

                            {/* Gestures Section */}
                            <div>
                                <h4 className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-3 px-4">Gestures</h4>
                                <div className="space-y-1">
                                    <Link
                                        href="/docs/air-cursor"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/air-cursor") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <MousePointer2 className="w-4 h-4" />
                                        Air Cursor
                                    </Link>
                                    <Link
                                        href="/docs/swipe-area"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/swipe-area") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                        Swipe Area
                                    </Link>
                                    <Link
                                        href="/docs/air-scroll"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/air-scroll") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <ArrowRight className="w-4 h-4 -rotate-90" />
                                        Air Scroll
                                    </Link>
                                    <Link
                                        href="/docs/pinch-to-zoom"
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive("/docs/pinch-to-zoom") ? "bg-white/10 text-white font-medium" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
                                    >
                                        <div className="flex gap-1 justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        </div>
                                        Pinch to Zoom
                                    </Link>
                                </div>
                            </div>

                            {/* GitHub link */}
                            <div className="border-t border-white/10 pt-4">
                                <a
                                    href="https://github.com/open-dev-society/kine-ui"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    Source Code
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {/* Command Search Modal */}
            <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
