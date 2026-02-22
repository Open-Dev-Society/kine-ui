"use client";

import { PinchToZoom } from "@/registry/gestures/PinchToZoom";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { AlertTriangle } from "lucide-react";

function PinchToZoomContent() {
    const { webcamError } = useKine();

    if (webcamError) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
                <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center gap-4 max-w-xl shadow-2xl">
                    <AlertTriangle className="w-8 h-8" />
                    <p className="font-medium">{webcamError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-start p-6 pt-24 pb-32">

            {/* Header Section */}
            <div className="text-center w-full max-w-xl mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 mb-6 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Requires Two Hands
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Pinch To Zoom</h1>
                <p className="text-neutral-400 text-lg">
                    Bring both hands into the frame. Pinch your thumb and index fingers together on each hand,
                    then pull apart or push together to dynamically scale the image below!
                </p>
            </div>

            {/* Interactive Zoom Area */}
            <div className="w-full max-w-3xl aspect-[16/10] rounded-3xl border border-white/10 bg-neutral-900 overflow-hidden flex items-center justify-center relative shadow-2xl mb-16">

                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <PinchToZoom minScale={0.5} maxScale={4} zoomSpeed={3}>
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] bg-black">
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="Abstract artistic rendering"
                            className="w-64 md:w-80 h-auto object-cover rounded-xl select-none pointer-events-none"
                            draggable={false}
                        />

                        {/* Overlay UI */}
                        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-xs font-medium text-white">Dynamic Asset</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Scale multiplier applied via Framer Motion</p>
                        </div>
                    </div>
                </PinchToZoom>

            </div>

            {/* Code Snippet Footer */}
            <div className="w-full max-w-2xl px-6">
                <p className="text-sm text-neutral-400 mb-3 font-medium">Example Usage</p>
                <pre className="p-4 rounded-xl bg-black/50 overflow-x-auto text-sm border border-white/10 text-neutral-300 font-mono shadow-xl backdrop-blur-md w-full">
                    <code>{`import { PinchToZoom } from "@/components/kine/gestures/PinchToZoom";

export default function GalleryImage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Wrap any standard DOM element to enable spatial scaling */}
      <PinchToZoom minScale={0.5} maxScale={5} zoomSpeed={3}>
        <img src="/assets/art.jpg" alt="Gallery artwork" />
      </PinchToZoom>
    </div>
  );
}`}</code>
                </pre>
            </div>

        </div>
    );
}

export default function PinchToZoomDemo() {
    return (
        <KineProvider showDebugVideo={true}>
            <PinchToZoomContent />
        </KineProvider>
    );
}
