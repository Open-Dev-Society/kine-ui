"use client";

import React, { useState } from "react";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { AirCursor } from "@/registry/gestures/AirCursor";
import { CheckCircle2, AlertTriangle, Play } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

const AirCursorDemoContent = () => {
    const [clickedCount, setClickedCount] = useState(0);
    const { webcamError } = useKine();

    if (webcamError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl max-w-md text-center gap-4">
                <AlertTriangle className="w-8 h-8" />
                <p className="font-medium">{webcamError}</p>
                <p className="text-sm opacity-80">Make sure no other apps (like Zoom or other browser tabs) are using your camera, then refresh the page.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <AirCursor activeColor="#10b981" />

            <div className="text-center z-10 relative space-y-4 mb-8">
                <h2 className="font-mono tracking-widest text-xl uppercase">Testing Area</h2>
                <p className="text-sm font-mono text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    {`> Please allow webcam access. You should see the debugger stream in the top right. Pinch to dispatch the click event.`}
                </p>
            </div>

            <button
                onClick={() => setClickedCount(c => c + 1)}
                className="relative z-10 px-8 py-4 bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all font-mono font-bold text-sm tracking-widest uppercase shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] group border border-transparent"
            >
                <span className="flex items-center gap-2">
                    [ Trigger Pinch_Click ]
                    {clickedCount > 0 && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-2" />}
                </span>
            </button>

            {clickedCount > 0 && (
                <p className="text-xs font-mono text-emerald-500 mt-6 animate-in fade-in slide-in-from-bottom-2">
                    {`> CLICK_EVENT DISPATCHED: ${clickedCount} TIMES`}
                </p>
            )}
        </div>
    );
};

export default function AirCursorPage() {
    const [isPreviewActive, setIsPreviewActive] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* 1. Header Area */}
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    REGISTRY: AIR_CURSOR
                </div>
                <h1 className="font-mono tracking-widest text-3xl md:text-5xl uppercase text-white">Air Cursor</h1>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                    {`> Controls the mouse pointer tracking coordinates with your index finger natively. Pinch your index finger and thumb together to dispatch a click event to the focused element in the DOM.`}
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
                            <AirCursorDemoContent />
                        </KineProvider>
                    )}
                </div>
            </div>

            {/* 3. Installation Command */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Installation</h2>
                <CodeBlock code="npx @opendevsociety/kine-ui@latest add air-cursor" />
            </div>

            {/* 4. Example Usage */}
            <div className="space-y-3 pb-24">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Example Usage</h2>
                <pre className="p-4 bg-[#050505] overflow-x-auto text-xs border border-white/10 text-neutral-300 font-mono shadow-xl w-full">
                    <code>{`import { AirCursor } from "@/components/kine/gestures/AirCursor";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      {/* Drop the component anywhere inside your App's KineProvider */}
      <AirCursor activeColor="#10b981" />
      
      <main>
        <h1>Spatial Dashboard</h1>
        <button onClick={() => alert("Pinched!")}>Pinch Me</button>
      </main>
    </div>
  );
}`}</code>
                </pre>
            </div>

        </div>
    );
}
