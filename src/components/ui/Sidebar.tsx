"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Terminal, ArrowRight, MousePointer2 } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const baseLinkClass = "flex items-center gap-3 text-sm px-3 py-2 rounded-lg transition-all duration-200 border";
    const activeLinkClass = "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.05)] border-white/10";
    const inactiveLinkClass = "text-neutral-400 hover:text-white hover:bg-white/5 border-transparent";

    return (
        <nav className="border-r border-white/5 md:w-72 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-transparent p-6 overflow-y-auto z-40 hidden md:flex flex-col">
            <div className="space-y-8">
                <div>
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 px-3 relative">
                        Getting Started
                        <div className="absolute left-0 bottom-0 top-0 w-0.5 bg-neutral-800 rounded-r-md" />
                    </h4>
                    <ul className="space-y-1.5">
                        <li>
                            <Link
                                href="/docs/installation"
                                className={`${baseLinkClass} ${isActive("/docs/installation") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <Terminal className="w-4 h-4" />
                                Installation
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/architecture"
                                className={`${baseLinkClass} ${isActive("/docs/architecture") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <Layers className="w-4 h-4" />
                                Architecture
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 px-3 relative">
                        Gestures
                        <div className="absolute left-0 bottom-0 top-0 w-0.5 bg-neutral-800 rounded-r-md" />
                    </h4>
                    <ul className="space-y-1.5">
                        <li>
                            <Link
                                href="/docs/air-cursor"
                                className={`${baseLinkClass} ${isActive("/docs/air-cursor") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <MousePointer2 className="w-4 h-4" />
                                Air Cursor
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/swipe-area"
                                className={`${baseLinkClass} ${isActive("/docs/swipe-area") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <ArrowRight className="w-4 h-4" />
                                    <span>Swipe Area</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/air-scroll"
                                className={`${baseLinkClass} ${isActive("/docs/air-scroll") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <ArrowRight className="w-4 h-4 -rotate-90" />
                                Air Scroll
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/pinch-to-zoom"
                                className={`${baseLinkClass} ${isActive("/docs/pinch-to-zoom") ? activeLinkClass : inactiveLinkClass}`}
                            >
                                <div className="flex gap-1 justify-center translate-y-[2px]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                </div>
                                Pinch to Zoom
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
