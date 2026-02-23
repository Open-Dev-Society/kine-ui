"use client";

import React, { useEffect, useRef } from "react";
import { useKine } from "./KineProvider";

interface AirScrollProps {
    scrollSpeed?: number;
    threshold?: number;
}

export function AirScroll({
    scrollSpeed = 1,
    threshold = 0.02
}: AirScrollProps) {
    const { landmarksRef } = useKine();
    const historyRef = useRef<number[]>([]);
    const lastScrollTime = useRef<number>(0);

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            if (landmarksRef.current && landmarksRef.current.length > 0) {
                // Focus on the first detected hand
                const hand = landmarksRef.current[0];

                // 0 is the wrist/base of the palm. We use this as a stable anchor for scrolling.
                const palmY = hand[0].y;

                historyRef.current.push(palmY);

                // Keep a rolling history of 10 frames
                if (historyRef.current.length > 10) {
                    historyRef.current.shift();

                    const oldestY = historyRef.current[0];
                    const newestY = historyRef.current[historyRef.current.length - 1];

                    // Calculate the vertical delta over the last 10 frames
                    const deltaY = newestY - oldestY;

                    // If the movement passes the noise threshold, trigger a scroll
                    if (Math.abs(deltaY) > threshold) {

                        // Optional constraint: Ensure the hand is "open" to avoid scrolling
                        // while trying to pinch-to-click. 
                        // We check if the tip of the index (8) is far from the thumb tip (4).
                        const indexTip = hand[8];
                        const thumbTip = hand[4];
                        const pinchDist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);

                        // Only scroll if they are NOT actively pinching (dist > 0.1 normalized)
                        if (pinchDist > 0.1) {

                            // Rate limit the scroll event slightly to prevent hyper-scrolling jitter
                            const now = performance.now();
                            if (now - lastScrollTime.current > 16) { // ~60 FPS cap

                                // Multiply by window height to convert normalized coordinate delta to physical pixels
                                // Multiply by scrollSpeed to allow user configuration of sensitivity
                                const scrollAmount = deltaY * window.innerHeight * scrollSpeed;

                                window.scrollBy({
                                    top: scrollAmount,
                                    behavior: "auto" // "auto" provides immediate tight 1:1 mapping compared to "smooth"
                                });

                                lastScrollTime.current = now;
                            }
                        }
                    }
                }
            } else {
                // Decay history if hand is lost
                if (historyRef.current.length > 0) {
                    historyRef.current.shift();
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [landmarksRef, scrollSpeed, threshold]);

    return null; // Headless component
}
