import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Air Cursor",
    description: "Track your index finger to control a spatial cursor on screen. Pinch your thumb and index finger together to click. Zero latency, GPU-accelerated hand tracking.",
};

export default function AirCursorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
