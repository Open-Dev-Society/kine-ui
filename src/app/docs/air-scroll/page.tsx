"use client";

import { AirScroll } from "@/registry/gestures/AirScroll";
import { KineProvider } from "@/registry/gestures/KineProvider";
import { Copy, AlertTriangle } from "lucide-react";
import { useKine } from "@/registry/gestures/KineProvider";

function AirScrollContent() {
    const { webcamError } = useKine();

    if (webcamError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center gap-4 max-w-3xl mx-auto mt-32">
                <AlertTriangle className="w-8 h-8" />
                <p className="font-medium">{webcamError}</p>
            </div>
        );
    }

    return (
        <>
            <AirScroll scrollSpeed={6} threshold={0.015} />

            <main className="max-w-3xl mx-auto px-6 pt-32 relative z-50">
                <h1 className="text-4xl font-bold mb-4">Air Scroll</h1>
                <p className="text-neutral-400 text-lg mb-12">
                    Control your continuous reading experience without touching the mouse.
                    Hold your hand open and move your palm vertically to scroll.
                </p>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p>
                        The AirScroll component maps the raw Y-coordinate of your palm/wrist
                        directly to the browser's native Window interface.
                    </p>

                    <div className="my-12 p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-8 h-8 text-blue-400"
                            >
                                <path d="M12 5v14m-7-7l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">Try scrolling this page down!</h3>
                        <p className="text-sm text-neutral-400 max-w-sm">
                            Keep your hand flat and open to prevent accidental pinch-clicks,
                            then move your hand up and down.
                        </p>
                    </div>

                    <h2>How it Works</h2>
                    <p>
                        The component maintains a rolling history of the last 10 frames (~160ms)
                        to compute the vertical velocity of the <strong>Wrist Landmark (0)</strong>.
                        If the delta exceeds a configurable noise threshold, it triggers a
                        programmable <code>scrollBy</code> sequence.
                    </p>

                    <pre className="mt-8 p-4 rounded-lg bg-black/50 overflow-x-auto text-sm border border-white/10">
                        <code>{`import { AirScroll } from "@/components/kine/gestures/AirScroll";

export default function ArticleLayout() {
  return (
    <div>
      {/* Headless component watches the camera silently */}
      <AirScroll scrollSpeed={6} threshold={0.015} />

      <article>
        <h1>Long-form content</h1>
        <p>Your users can read hands-free while eating...</p>
      </article>
    </div>
  );
}`}</code>
                    </pre>

                    <h2 className="mt-16">Pinch Protection</h2>
                    <p>
                        A common UX issue with spatial scroll implementations is that dragging
                        actions (like pinching to drag a map) accidentally trigger page scrolls.
                    </p>
                    <p>
                        AirScroll natively checks the Euclidean distance between the
                        <strong> Index Finger Tip (8)</strong> and the <strong>Thumb Tip (4)</strong>.
                        If the distance drops below 10% of the camera normalization space, scrolling
                        is instantly suspended so the user can interact with other elements perfectly.
                    </p>

                    {/* Add vertical height to force scrolling */}
                    <div className="h-[150vh] flex flex-col justify-end pb-32">
                        <div className="text-center text-neutral-500">
                            <p>You reached the bottom!</p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors transition-transform active:scale-95"
                            >
                                Scroll Back To Top
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default function AirScrollDemo() {
    return (
        <KineProvider showDebugVideo={true}>
            <div className="min-h-screen bg-neutral-950 text-white pb-32">
                <AirScrollContent />
            </div>
        </KineProvider>
    );
}
