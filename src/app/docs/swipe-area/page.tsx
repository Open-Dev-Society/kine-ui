"use client";

import React, { useState } from "react";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { SwipeArea } from "@/registry/gestures/SwipeArea";
import { ChevronLeft, ChevronRight, AlertTriangle, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "@/components/ui/CodeBlock";

const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800&h=500",
];

const SwipeAreaDemoContent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { webcamError } = useKine();

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (webcamError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center gap-4 w-full h-full">
                <AlertTriangle className="w-8 h-8" />
                <p className="font-medium">{webcamError}</p>
                <p className="text-sm opacity-80">Make sure no other apps (like Zoom or other browser tabs) are using your camera, then refresh the page.</p>
            </div>
        );
    }

    return (
        <SwipeArea
            onSwipeLeft={handlePrev}
            onSwipeRight={handleNext}
            velocityThreshold={0.12} // slightly more sensitive for the demo
            className="w-full h-full"
        >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80">
                    <div className="flex items-center gap-2">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Swipe Left</span>
                    </div>
                    <div className="flex gap-2">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/30'}`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Swipe Right</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </SwipeArea>
    );
};

export default function SwipeAreaPage() {
    const [isPreviewActive, setIsPreviewActive] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-12">

            {/* 1. Header Area */}
            <div className="space-y-4 relative z-50">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-neutral-400 mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    REGISTRY: SWIPE_AREA
                </div>
                <h1 className="font-mono tracking-widest text-3xl md:text-5xl uppercase text-white">Swipe Area</h1>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                    {`> Detects high-velocity horizontal hand motion. Try swiping your hand left or right in front of the camera to cycle the carousel.`}
                </p>
            </div>

            {/* 2. Interactive Preview */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Live Preview</h2>
                <div className="relative rounded-none bg-[#050505] border border-white/10 h-[500px] flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl">
                    {!isPreviewActive ? (
                        <div className="flex flex-col items-center justify-center space-y-6 z-10 w-full h-full">
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
                            <SwipeAreaDemoContent />
                        </KineProvider>
                    )}
                </div>
            </div>

            {/* 3. Installation Command */}
            <div className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Installation</h2>
                <CodeBlock code="npx @opendevsociety/kine-ui@latest add swipe-area" />
            </div>

            {/* 4. Example Usage */}
            <div className="space-y-3 pb-24">
                <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-500">Example Usage</h2>
                <pre className="p-4 bg-[#050505] overflow-x-auto text-xs border border-white/10 text-neutral-300 font-mono shadow-xl w-full">
                    <code>{`import { SwipeArea } from "@/components/kine/gestures/SwipeArea";

export default function GalleryLayout() {
  return (
    <div className="w-full h-screen">
      <SwipeArea 
        onSwipeLeft={() => nextImage()}
        onSwipeRight={() => previousImage()}
        velocityThreshold={0.15}
        className="w-full h-full"
      >
        <ImageCarousel />
      </SwipeArea>
    </div>
  );
}`}</code>
                </pre>
            </div>

        </div>
    );
}
