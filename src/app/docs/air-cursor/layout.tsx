import type { Metadata } from "next";

const title = "Air Cursor";
const description = "Track your index finger to control a spatial cursor on screen. Pinch your thumb and index finger together to click. Zero latency, GPU-accelerated hand tracking.";
const url = "https://kine-ui.vercel.app/docs/air-cursor";

export const metadata: Metadata = {
    title,
    description,
    keywords: ["air cursor", "hand tracking cursor", "spatial cursor", "finger tracking", "pinch to click", "mediapipe cursor", "gesture cursor", "react hand tracking"],
    openGraph: {
        title: `${title} | Kine UI`,
        description,
        url,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: `${title} | Kine UI`,
        description,
    },
    alternates: {
        canonical: url,
    },
};

export default function AirCursorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
