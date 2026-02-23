import { DocsLayoutClient } from "@/components/ui/DocsLayoutClient";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: "Kine UI Documentation",
                        description:
                            "Technical documentation for Kine UI — open-source hand gesture components for React powered by MediaPipe WebAssembly.",
                        url: "https://kine-ui.vercel.app/docs",
                        author: {
                            "@type": "Organization",
                            name: "Open Dev Society",
                            url: "https://github.com/open-dev-society",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Open Dev Society",
                        },
                        about: {
                            "@type": "SoftwareApplication",
                            name: "Kine UI",
                            applicationCategory: "DeveloperApplication",
                        },
                    }),
                }}
            />
            <DocsLayoutClient>{children}</DocsLayoutClient>
        </>
    );
}
