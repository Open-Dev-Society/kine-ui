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
        <div className="relative group rounded-lg bg-black/50 border border-white/10 p-4 font-mono text-sm text-neutral-300 shadow-inner">
            <pre className="overflow-x-auto whitespace-pre-wrap">
                <code>{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-md bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Copy code"
            >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
    );
}
