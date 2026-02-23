import type { Metadata } from "next";

const title = "Air Scroll";
const description = "Scroll web pages hands-free by tracking palm position. Move your hand up or down to control scroll direction and speed with configurable sensitivity.";
const url = "https://kine-ui.vercel.app/docs/air-scroll";

export const metadata: Metadata = {
    title,
    description,
    keywords: ["air scroll", "hands-free scrolling", "palm tracking scroll", "gesture scroll", "hand tracking scroll", "mediapipe scroll", "react gesture scroll"],
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

export default function AirScrollLayout({ children }: { children: React.ReactNode }) {
    return children;
}
