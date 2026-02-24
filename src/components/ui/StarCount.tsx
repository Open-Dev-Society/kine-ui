"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface StarCountProps {
    count: number | null;
    delay?: number;
}

export function StarCount({ count, delay = 0 }: StarCountProps) {
    const [display, setDisplay] = useState(0);
    const animated = useRef(false);

    useEffect(() => {
        if (count === null || count === undefined || count === 0 || animated.current) {
            if (count !== null && count !== undefined) setDisplay(count);
            return;
        }

        animated.current = true;
        const timer = setTimeout(() => {
            const duration = 1500;
            const start = performance.now();

            const step = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(Math.floor(eased * count));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setDisplay(count);
                }
            };

            requestAnimationFrame(step);
        }, delay);

        return () => clearTimeout(timer);
    }, [count, delay]);

    if (count === null || count === undefined) return null;

    return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="tabular-nums">{display}</span>
        </span>
    );
}

