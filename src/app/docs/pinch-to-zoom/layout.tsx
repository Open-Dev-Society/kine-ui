import type { Metadata } from "next";

const title = "Pinch to Zoom";
const description = "Use both hands to pinch and zoom DOM elements with bimanual gesture tracking. Scale images, maps, and components with natural two-hand gestures.";
const url = "https://kine-ui.vercel.app/docs/pinch-to-zoom";

export const metadata: Metadata = {
    title,
    description,
    keywords: ["pinch to zoom", "bimanual gesture", "two hand zoom", "gesture zoom", "hand tracking zoom", "mediapipe zoom", "react pinch zoom", "spatial zoom"],
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

export default function PinchToZoomLayout({ children }: { children: React.ReactNode }) {
    return children;
}
