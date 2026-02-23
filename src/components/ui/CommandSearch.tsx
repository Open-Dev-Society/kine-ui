"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Terminal, MousePointer2, CornerDownLeft } from "lucide-react";

interface SearchItem {
    title: string;
    description: string;
    href: string;
    category: string;
}

const searchItems: SearchItem[] = [
    { title: "Installation", description: "Set up Kine UI in your Next.js app", href: "/docs/installation", category: "Getting Started" },
    { title: "Architecture", description: "How the pipeline works under the hood", href: "/docs/architecture", category: "Getting Started" },
    { title: "Air Cursor", description: "Index-finger spatial tracking with pinch clicks", href: "/docs/air-cursor", category: "Gestures" },
    { title: "Swipe Area", description: "High-velocity horizontal hand motion detection", href: "/docs/swipe-area", category: "Gestures" },
    { title: "Air Scroll", description: "Hands-free page scrolling via palm tracking", href: "/docs/air-scroll", category: "Gestures" },
    { title: "Pinch to Zoom", description: "Bimanual Euclidean scaling for DOM elements", href: "/docs/pinch-to-zoom", category: "Gestures" },
];

interface CommandSearchProps {
    open: boolean;
    onClose: () => void;
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Keyboard shortcut: Escape to close
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (open) {
            window.addEventListener("keydown", handler);
            return () => window.removeEventListener("keydown", handler);
        }
    }, [open, onClose]);

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const filtered = useMemo(() => {
        if (!query.trim()) return searchItems;
        const q = query.toLowerCase();
        return searchItems.filter(
            item =>
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
        );
    }, [query]);

    // Reset selection when results change
    useEffect(() => {
        setSelectedIndex(0);
    }, [filtered]);

    const handleSelect = (href: string) => {
        onClose();
        router.push(href);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
            handleSelect(filtered[selectedIndex].href);
        }
    };

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[520px] z-[101] px-4">
                <div className="border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/50 overflow-hidden">

                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                        <Search className="w-4 h-4 text-neutral-500 shrink-0" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search components..."
                            className="flex-1 bg-transparent text-sm text-white font-mono placeholder:text-neutral-600 outline-none"
                        />
                        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 bg-white/5 border border-white/10 rounded">
                            ESC
                        </kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-[320px] overflow-y-auto py-2">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-8 text-center">
                                <p className="text-sm font-mono text-neutral-600">No results found.</p>
                            </div>
                        ) : (
                            filtered.map((item, i) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleSelect(item.href)}
                                    onMouseEnter={() => setSelectedIndex(i)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${i === selectedIndex
                                        ? "bg-white/5"
                                        : "hover:bg-white/[0.02]"
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        {item.category === "Gestures" ? (
                                            <MousePointer2 className="w-3.5 h-3.5 text-neutral-400" />
                                        ) : (
                                            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-white font-mono">{item.title}</div>
                                        <div className="text-xs text-neutral-500 truncate">{item.description}</div>
                                    </div>
                                    {i === selectedIndex && (
                                        <CornerDownLeft className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 bg-white/[0.01]">
                        <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">↑↓</kbd>
                                Navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1 py-0.5 bg-white/5 border border-white/10 rounded text-[9px]">↵</kbd>
                                Select
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-600 tracking-widest">{filtered.length} results</span>
                    </div>
                </div>
            </div>
        </>
    );
}

// Export a hook for the shortcut display
export function useIsMac() {
    const [isMac, setIsMac] = useState(false);
    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    }, []);
    return isMac;
}
