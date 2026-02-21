"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useKine } from "./KineProvider";

interface AirCursorProps {
    pinchThreshold?: number;
    activeColor?: string;
    idleColor?: string;
}

export const AirCursor: React.FC<AirCursorProps> = ({
    pinchThreshold = 0.04,
    activeColor = "#3b82f6", // Default tailwind blue-500
    idleColor = "#000000",
}) => {
    const { landmarksRef, isWebcamActive } = useKine();
    const [isPinching, setIsPinching] = useState(false);
    const clickDebounceRef = useRef<boolean>(false);

    // Smooth springs for cursor position to filter out webcam jitter
    const xSpring = useSpring(0, { stiffness: 300, damping: 20 });
    const ySpring = useSpring(0, { stiffness: 300, damping: 20 });
    const opacitySpring = useSpring(0, { stiffness: 300, damping: 20 });

    useEffect(() => {
        if (!isWebcamActive) return;

        let animationFrameId: number;

        const loop = () => {
            const landmarks = landmarksRef.current;
            if (landmarks && landmarks.length > 0) {
                opacitySpring.set(1);
                // Grab the first hand detected
                const thumbTip = landmarks[0][4];  // Thumb tip is 4
                const indexTip = landmarks[0][8]; // Index finger tip is 8

                // Convert normalized coordinates (0-1) to viewport pixels
                // We MUST invert the X-axis because the webcam video is visually mirrored!
                const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
                const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

                const targetX = (1 - indexTip.x) * windowWidth;
                const targetY = indexTip.y * windowHeight;

                xSpring.set(targetX);
                ySpring.set(targetY);

                // Calculate 3D Euclidean distance for pinch detection
                const dx = indexTip.x - thumbTip.x;
                const dy = indexTip.y - thumbTip.y;
                const dz = indexTip.z - thumbTip.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < pinchThreshold) {
                    setIsPinching((currentIsPinching) => {
                        if (!currentIsPinching) {
                            // Fire click event if not debounced
                            if (!clickDebounceRef.current) {
                                clickDebounceRef.current = true;
                                // Find element under cursor and trigger a simulated click
                                const el = document.elementFromPoint(targetX, targetY);
                                if (el && el instanceof HTMLElement) {
                                    el.click();
                                }
                                // Simple debounce to prevent rapid-fire clicks
                                setTimeout(() => {
                                    clickDebounceRef.current = false;
                                }, 500);
                            }
                            return true;
                        }
                        return currentIsPinching;
                    });
                } else {
                    setIsPinching((currentIsPinching) => {
                        return currentIsPinching ? false : currentIsPinching;
                    });
                }
            } else {
                opacitySpring.set(0);
                setIsPinching((currentIsPinching) => {
                    return currentIsPinching ? false : currentIsPinching;
                });
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isWebcamActive, landmarksRef, pinchThreshold, xSpring, ySpring, opacitySpring]);

    if (!isWebcamActive) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                x: xSpring,
                y: ySpring,
                opacity: opacitySpring,
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: isPinching ? activeColor : idleColor,
                border: "2px solid white",
                pointerEvents: "none", // Prevent the cursor from blocking its own clicks!
                zIndex: 99999,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                scale: isPinching ? 0.8 : 1,
            }}
            transition={{ duration: 0.15 }}
        />
    );
};
