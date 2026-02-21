"use client";

import React, { useState } from "react";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { AirCursor } from "@/registry/gestures/AirCursor";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

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
        <>
            <AirCursor activeColor="#10b981" />

            <div className="text-center z-10 relative space-y-4">
                <h2 className="text-xl font-medium">Testing Area</h2>
                <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                    Please allow webcam access. You should see the debugger in the top right.
                    Pinch to click the button below.
                </p>
            </div>

            <button
                onClick={() => setClickedCount(c => c + 1)}
                className="relative z-10 px-8 py-4 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all rounded-xl font-bold shadow-lg shadow-blue-500/20 group"
            >
                <span className="flex items-center gap-2">
                    Click me with a pinch
                    {clickedCount > 0 && <CheckCircle2 className="w-5 h-5 text-green-300" />}
                </span>
            </button>

            {clickedCount > 0 && (
                <p className="text-sm font-medium text-blue-400 animate-in fade-in slide-in-from-bottom-2">
                    Successfully clicked {clickedCount} times!
                </p>
            )}
        </>
    );
};

export default function AirCursorDemo() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8">
            <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Air Cursor</h1>
                    <p className="text-neutral-400">Controls the mouse pointer with your index finger. Pinch your index finger and thumb together to click.</p>
                </div>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 min-h-[400px] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
                    {/* We wrap the interactive area with KineProvider so the webcam is active */}
                    <KineProvider showDebugVideo={true}>
                        <AirCursorDemoContent />
                    </KineProvider>
                </div>
            </div>
        </div>
    );
}
