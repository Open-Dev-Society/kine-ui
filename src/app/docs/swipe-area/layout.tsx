import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Swipe Area",
    description: "Detect high-velocity horizontal hand swipes to navigate between content. Gesture-driven carousels and galleries with configurable velocity thresholds.",
};

export default function SwipeAreaLayout({ children }: { children: React.ReactNode }) {
    return children;
}
