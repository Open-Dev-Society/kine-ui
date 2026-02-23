"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
    code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group bg-[#050505] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs my-6">
            {/* Raw Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                <div className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">system.out</div>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto text-neutral-300 bg-transparent flex items-start gap-3">
                <span className="text-emerald-500 select-none mr-1">{`$`}</span>
                <pre className="whitespace-pre-wrap">
                    <code>{code}</code>
                </pre>
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10"
                aria-label="Copy code"
            >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
    );
}
