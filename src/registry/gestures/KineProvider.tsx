"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { engine } from "../core/kine-engine";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

interface KineContextType {
    landmarksRef: React.MutableRefObject<NormalizedLandmark[][] | null>;
    isWebcamActive: boolean;
    webcamError: string | null;
}

const KineContext = createContext<KineContextType>({
    landmarksRef: { current: null },
    isWebcamActive: false,
    webcamError: null,
});

export const useKine = () => useContext(KineContext);

interface KineProviderProps {
    children: React.ReactNode;
    showDebugVideo?: boolean;
}

export const KineProvider: React.FC<KineProviderProps> = ({ children, showDebugVideo = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [webcamError, setWebcamError] = useState<string | null>(null);
    const landmarksRef = useRef<NormalizedLandmark[][] | null>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        let isUnmounted = false;
        let lastVideoTime = -1;

        const startWebcam = async () => {
            try {
                // Ensure no other tabs are hoarding the camera if possible on some browsers
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                });

                if (isUnmounted) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;

                    // Explicitly attempt to play to prevent frozen stream
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current?.play().catch(e => console.error("Play error:", e));
                    };

                    videoRef.current.addEventListener("loadeddata", async () => {
                        try {
                            await engine.initialize(videoRef.current!);
                            if (isUnmounted) return;
                            setIsWebcamActive(true);
                            setWebcamError(null);
                            detectFrame();
                        } catch (initError) {
                            console.error("MediaPipe initialization error:", initError);
                            setWebcamError("Failed to initialize gesture engine.");
                        }
                    });
                }
            } catch (error: any) {
                console.error("Error accessing webcam: ", error);
                if (error.name === "NotReadableError") {
                    setWebcamError("Camera is presently in use by another application or tab.");
                } else if (error.name === "NotAllowedError") {
                    setWebcamError("Camera access was denied.");
                } else {
                    setWebcamError(error.message || "Failed to access webcam.");
                }
            }
        };

        const detectFrame = () => {
            if (isUnmounted) return;

            // Standard MediaPipe optimization: Only detect if video frame has actually updated
            if (videoRef.current && videoRef.current.currentTime !== lastVideoTime) {
                lastVideoTime = videoRef.current.currentTime;

                // Use strictly increasing timestamp
                const result = engine.detectHands(performance.now());

                if (result && result.landmarks && result.landmarks.length > 0) {
                    landmarksRef.current = result.landmarks;
                } else {
                    landmarksRef.current = null;
                }
            }
            requestRef.current = requestAnimationFrame(detectFrame);
        };

        startWebcam();

        return () => {
            isUnmounted = true;
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <KineContext.Provider value={{ landmarksRef, isWebcamActive, webcamError }}>
            {/* Hidden (or debug) video element for MediaPipe processing */}
            <video
                ref={videoRef}
                playsInline
                muted
                style={{
                    display: showDebugVideo ? "block" : "none",
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "320px",
                    height: "240px",
                    zIndex: 9999,
                    transform: "scaleX(-1)", // Mirror the video for user interaction
                }}
            />
            {children}
        </KineContext.Provider>
    );
};
