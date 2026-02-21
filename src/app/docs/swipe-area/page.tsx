"use client";

import React, { useState } from "react";
import { KineProvider, useKine } from "@/registry/gestures/KineProvider";
import { SwipeArea } from "@/registry/gestures/SwipeArea";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1682687982501-1e58f813fc5b?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1682687221038-404670f09439?auto=format&fit=crop&q=80&w=800&h=500",
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

export default function SwipeAreaDemo() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8 overflow-hidden">
            <Link href="/" className="relative z-50 inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-2 relative z-50">
                    <h1 className="text-3xl font-bold">Swipe Area</h1>
                    <p className="text-neutral-400">Detects high-velocity horizontal hand motion. Try swiping your hand left or right in front of the camera to cycle the carousel.</p>
                </div>

                <KineProvider showDebugVideo={true}>
                    <div className="rounded-2xl bg-white/5 border border-white/10 h-[500px] flex items-center justify-center p-4">
                        <SwipeAreaDemoContent />
                    </div>
                </KineProvider>
            </div>
        </div>
    );
}
