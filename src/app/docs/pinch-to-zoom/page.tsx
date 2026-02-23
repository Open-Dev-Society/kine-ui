"use client";

import React, { useState } from "react";
import { PinchToZoom } from "@/registry/gestures/PinchToZoom";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { AlertTriangle, Play } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

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
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            {/* Interactive Zoom Area */}
            <div className="w-full max-w-3xl aspect-[16/10] border border-white/10 bg-neutral-900 overflow-hidden flex items-center justify-center relative shadow-2xl">

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
        </div>
    );
}

export default function PinchToZoomPage() {
    const [isPreviewActive, setIsPreviewActive] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* 1. Header Area */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    REGISTRY: PINCH_TO_ZOOM
                </div>
                <h1 className="font-mono tracking-widest text-3xl md:text-5xl uppercase text-white">Pinch To Zoom</h1>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                    {`> Bring both hands into the frame. Pinch your thumb and index fingers together on each hand, then pull apart or push together to dynamically scale the DOM element.`}
                </p>
            </div>

            {/* 2. Interactive Preview */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Live Preview</h2>
                <div className="relative rounded-none bg-[#050505] border border-white/10 min-h-[500px] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                    {!isPreviewActive ? (
                        <div className="flex flex-col items-center justify-center space-y-6 z-10 p-8 w-full h-full bg-[#0a0a0a]">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                <Play className="w-6 h-6 text-neutral-400 ml-1" />
                            </div>
                            <p className="font-mono text-sm text-neutral-500 max-w-sm text-center leading-relaxed">
                                {`> The preview requires mounting the webcam tracking engine. Click below to initialize.`}
                            </p>
                            <button
                                onClick={() => setIsPreviewActive(true)}
                                className="px-6 py-2 bg-white text-black hover:bg-neutral-200 transition-colors font-mono text-xs uppercase tracking-widest font-bold"
                            >
                                [ Load Interactive Preview ]
                            </button>
                        </div>
                    ) : (
                        <KineProvider showDebugVideo={true}>
                            <PinchToZoomContent />
                        </KineProvider>
                    )}
                </div>
            </div>

            {/* 3. Installation Command */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Installation</h2>
                <CodeBlock code="npx @opendevsociety/kine-ui@latest add pinch-to-zoom" />
            </div>

            {/* 4. Example Usage */}
            <div className="space-y-3 pb-24">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Example Usage</h2>
                <pre className="p-4 bg-[#050505] overflow-x-auto text-xs border border-white/10 text-neutral-300 font-mono shadow-xl w-full">
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
