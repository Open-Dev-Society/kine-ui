import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pinch to Zoom",
    description: "Use both hands to pinch and zoom DOM elements with bimanual gesture tracking. Scale images, maps, and components with natural two-hand gestures.",
};

export default function PinchToZoomLayout({ children }: { children: React.ReactNode }) {
    return children;
}
