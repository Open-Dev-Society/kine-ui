export function KineLogo({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* 
                Kine UI Brand Mark
                Three ascending bars fanning out like fingers in motion,
                with a dot representing the tracked landmark point.
                Inspired by Vercel, Linear, Stripe-level geometric marks.
            */}

            {/* Bar 1 — shortest, leftmost */}
            <rect x="6" y="20" width="5" height="14" rx="2.5" fill="currentColor" />

            {/* Bar 2 — medium, middle */}
            <rect x="15" y="12" width="5" height="22" rx="2.5" fill="currentColor" />

            {/* Bar 3 — tallest, rightmost */}
            <rect x="24" y="4" width="5" height="30" rx="2.5" fill="currentColor" />

            {/* Tracking dot — the landmark point */}
            <circle cx="34" cy="8" r="3" fill="currentColor" />
        </svg>
    );
}
