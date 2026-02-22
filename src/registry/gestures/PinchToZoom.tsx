"use client";

import React, { useEffect, useRef, useState } from "react";
import { useKine } from "./KineProvider";
import { motion, useSpring, useTransform } from "framer-motion";

interface PinchToZoomProps {
    children: React.ReactNode;
    minScale?: number;
    maxScale?: number;
    zoomSpeed?: number;
}

export function PinchToZoom({
    children,
    minScale = 0.5,
    maxScale = 5,
    zoomSpeed = 8
}: PinchToZoomProps) {
    const { landmarksRef } = useKine();

    // We use a React state to gracefully disable pointer-events if the user is zooming
    // This stops them from accidentally clicking things under the image while zooming
    const [isZooming, setIsZooming] = useState(false);

    // Physically simulate the scale distance to smooth out tiny camera jitters
    const scale = useSpring(1, {
        stiffness: 400,
        damping: 40,
        mass: 0.8
    });

    const isZoomingRef = useRef(false);
    const initialDistanceRef = useRef<number | null>(null);
    const currentScaleRef = useRef<number>(1);

    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            const hands = landmarksRef.current || [];

            // PinchToZoom explicitly requires EXACTLY 2 hands detected by MediaPipe
            if (hands.length === 2) {
                const hand1 = hands[0];
                const hand2 = hands[1];

                const thumb1 = hand1[4];
                const index1 = hand1[8];
                const thumb2 = hand2[4];
                const index2 = hand2[8];

                // Are BOTH hands currently pinching?
                const isHand1Pinching = Math.hypot(thumb1.x - index1.x, thumb1.y - index1.y) < 0.1;
                const isHand2Pinching = Math.hypot(thumb2.x - index2.x, thumb2.y - index2.y) < 0.1;

                if (isHand1Pinching && isHand2Pinching) {
                    if (!isZoomingRef.current) {
                        isZoomingRef.current = true;
                        setIsZooming(true);

                        // Calculate center points of each pinch lock
                        const pinch1Center = { x: (thumb1.x + index1.x) / 2, y: (thumb1.y + index1.y) / 2 };
                        const pinch2Center = { x: (thumb2.x + index2.x) / 2, y: (thumb2.y + index2.y) / 2 };

                        // Store the initial distance to calculate future scale multipliers
                        initialDistanceRef.current = Math.hypot(pinch1Center.x - pinch2Center.x, pinch1Center.y - pinch2Center.y);
                    } else if (initialDistanceRef.current !== null) {

                        const pinch1Center = { x: (thumb1.x + index1.x) / 2, y: (thumb1.y + index1.y) / 2 };
                        const pinch2Center = { x: (thumb2.x + index2.x) / 2, y: (thumb2.y + index2.y) / 2 };
                        const currentDistance = Math.hypot(pinch1Center.x - pinch2Center.x, pinch1Center.y - pinch2Center.y);

                        // Calculate scale delta
                        const distanceDelta = currentDistance - initialDistanceRef.current;

                        // Apply speed multiplier and clamp
                        const newRawScale = currentScaleRef.current + (distanceDelta * zoomSpeed);
                        const clampedScale = Math.max(minScale, Math.min(newRawScale, maxScale));

                        scale.set(clampedScale);

                        // Re-calibrate the distance anchor dynamically to allow continuous "ratcheting"
                        // where the user can spread, release one hand, grab again, and spread further
                        initialDistanceRef.current = currentDistance;
                        currentScaleRef.current = clampedScale;
                    }
                } else {
                    // One or both hands let go of the pinch.
                    if (isZoomingRef.current) {
                        isZoomingRef.current = false;
                        setIsZooming(false);
                        initialDistanceRef.current = null;

                        // We do NOT snap back to 1.0 here, allowing the user to "ratchet"
                        // their zoom by letting go, moving hands, and grabbing again.
                    }
                }
            } else {
                // Lost sight of 2 hands completely
                if (isZoomingRef.current) {
                    isZoomingRef.current = false;
                    setIsZooming(false);
                    initialDistanceRef.current = null;
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [landmarksRef, scale, minScale, maxScale, zoomSpeed]);

    return (
        <motion.div
            style={{
                scale,
                // Automatically disable pointer events on chidren while actively physically scaling them
                pointerEvents: isZooming ? "none" : "auto",
                touchAction: "none"
            }}
            className="transform-gpu origin-center relative inline-block z-50"
        >
            {children}
        </motion.div>
    );
}
