import type { Metadata } from "next";

const title = "Swipe Area";
const description = "Detect high-velocity horizontal hand swipes to navigate between content. Gesture-driven carousels and galleries with configurable velocity thresholds.";
const url = "https://kine-ui.vercel.app/docs/swipe-area";

export const metadata: Metadata = {
    title,
    description,
    keywords: ["swipe area", "hand swipe detection", "gesture navigation", "swipe gesture", "hand tracking swipe", "react swipe component", "mediapipe swipe"],
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

export default function SwipeAreaLayout({ children }: { children: React.ReactNode }) {
    return children;
}
