"use client";

import React, { useState } from "react";

import { AirScroll } from "@/registry/gestures/AirScroll";
import { KineProvider } from "@/registry/gestures/KineProvider";
import { AlertTriangle, Play } from "lucide-react";
import { useKine } from "@/registry/gestures/KineProvider";
import { CodeBlock } from "@/components/ui/CodeBlock";

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
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
            <AirScroll scrollSpeed={6} threshold={0.015} />

            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-blue-400">
                    <path d="M12 5v14m-7-7l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h3 className="font-mono tracking-widest text-lg uppercase mb-2 text-white">Move your hand up/down</h3>
            <p className="text-sm font-mono text-neutral-400 max-w-sm text-center">
                {`> Keep your hand flat and open. The page will scroll based on your palm's vertical position.`}
            </p>
        </div>
    );
}

export default function AirScrollPage() {
    const [isPreviewActive, setIsPreviewActive] = React.useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* 1. Header Area */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    REGISTRY: AIR_SCROLL
                </div>
                <h1 className="font-mono tracking-widest text-3xl md:text-5xl uppercase text-white">Air Scroll</h1>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                    {`> Control your continuous reading experience without touching the mouse. Hold your hand open and move your palm vertically to scroll. The AirScroll component maps the raw Y-coordinate of your palm/wrist directly to the browser's native Window interface.`}
                </p>
            </div>

            {/* 2. Interactive Preview */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Live Preview</h2>
                <div className="relative rounded-none bg-[#050505] border border-white/10 min-h-[450px] flex flex-col items-center justify-center p-8 overflow-hidden shadow-2xl">
                    {!isPreviewActive ? (
                        <div className="flex flex-col items-center justify-center space-y-6 z-10">
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
                            <AirScrollContent />
                        </KineProvider>
                    )}
                </div>
            </div>

            {/* 3. Installation Command */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Installation</h2>
                <CodeBlock code="npx @opendevsociety/kine-ui@latest add air-scroll" />
            </div>

            {/* 4. Example Usage */}
            <div className="space-y-3 pb-24">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Example Usage</h2>
                <pre className="p-4 bg-[#050505] overflow-x-auto text-xs border border-white/10 text-neutral-300 font-mono shadow-xl w-full">
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
            </div>

        </div>
    );
}
