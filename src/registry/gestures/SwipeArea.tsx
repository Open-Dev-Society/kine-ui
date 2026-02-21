"use client";

import React, { useEffect, useRef } from "react";
import { useKine } from "./KineProvider";

interface SwipeAreaProps {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    velocityThreshold?: number;
    className?: string;
}

export const SwipeArea: React.FC<SwipeAreaProps> = ({
    children,
    onSwipeLeft,
    onSwipeRight,
    velocityThreshold = 0.15, // Minimum change in normalized X over 5 frames
    className = "",
}) => {
    const { landmarksRef, isWebcamActive } = useKine();
    const historyRef = useRef<number[]>([]);
    const cooldownRef = useRef<boolean>(false);

    const onSwipeLeftRef = useRef(onSwipeLeft);
    const onSwipeRightRef = useRef(onSwipeRight);

    useEffect(() => {
        onSwipeLeftRef.current = onSwipeLeft;
        onSwipeRightRef.current = onSwipeRight;
    }, [onSwipeLeft, onSwipeRight]);

    useEffect(() => {
        if (!isWebcamActive) return;

        let animationFrameId: number;

        const loop = () => {
            if (cooldownRef.current) {
                animationFrameId = requestAnimationFrame(loop);
                return;
            }

            const landmarks = landmarksRef.current;
            if (landmarks && landmarks.length > 0) {
                // Track palm base (landmark 0) to evaluate aggregate hand movement
                const palm = landmarks[0][0];
                const currentX = palm.x;

                const history = historyRef.current;
                history.push(currentX);

                // Keep only the last 15 frames for velocity calculation
                // (At 60fps, 15 frames is ~250ms of movement)
                if (history.length > 15) {
                    history.shift();
                }

                if (history.length === 15) {
                    const oldestX = history[0];
                    const newestX = history[14];
                    const deltaX = newestX - oldestX;

                    if (Math.abs(deltaX) > velocityThreshold) {
                        // Warning: The MediaPipe webcam feed is horizontally mirrored. 
                        // A physical left swipe results in a positive delta in normalized coordinates.
                        if (deltaX > 0) {
                            onSwipeLeftRef.current?.();
                        } else {
                            onSwipeRightRef.current?.();
                        }

                        // Trigger cooldown to prevent multiple swipes from a single motion
                        cooldownRef.current = true;
                        historyRef.current = []; // Clear history
                        setTimeout(() => {
                            cooldownRef.current = false;
                        }, 800); // 800ms threshold
                    }
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isWebcamActive, landmarksRef, velocityThreshold]);

    return <div className={`relative w-full h-full ${className}`}>{children}</div>;
};
