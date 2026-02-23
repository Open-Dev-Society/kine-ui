import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Air Scroll",
    description: "Scroll web pages hands-free by tracking palm position. Move your hand up or down to control scroll direction and speed with configurable sensitivity.",
};

export default function AirScrollLayout({ children }: { children: React.ReactNode }) {
    return children;
}
