import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kine UI — Spatial Computing Components for React",
        short_name: "Kine UI",
        description:
            "Open-source hand gesture components for React. Copy-paste spatial computing primitives powered by MediaPipe WebAssembly.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0a",
        theme_color: "#0a0a0a",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
