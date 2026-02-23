import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/CodeBlock";

const title = "Architecture";
const description = "How Kine UI works under the hood — the zero-server pipeline from webcam to MediaPipe WASM to hand landmarks to React components, all in under 16ms.";
const url = "https://kine-ui.vercel.app/docs/architecture";

export const metadata: Metadata = {
    title,
    description,
    keywords: ["kine ui architecture", "mediapipe pipeline", "hand tracking architecture", "webassembly hand tracking", "react gesture architecture", "landmark detection pipeline"],
    openGraph: {
        title: `${title} | Kine UI`,
        description,
        url,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: `${title} | Kine UI`,
        description,
    },
    alternates: {
        canonical: url,
    },
};

export default function ArchitecturePage() {
    return (
        <div className="space-y-16 max-w-3xl">
            {/* Header */}
            <div className="space-y-4">
                <div className="text-xs font-mono text-emerald-500 tracking-widest uppercase">SYS_ARCHITECTURE</div>
                <h1 className="font-mono tracking-widest text-3xl md:text-5xl uppercase text-white">Architecture</h1>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
                    A zero-server pipeline. Webcam frames enter the browser, get processed by WebAssembly, and produce landmark coordinates that drive your React components — all in under 16ms.
                </p>
            </div>

            {/* Pipeline Overview */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono tracking-widest uppercase text-white">The Pipeline</h2>
                <div className="border border-white/10 bg-[#050505] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">data_flow</span>
                    </div>
                    <div className="p-6 font-mono text-sm space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-neutral-300">
                            <span className="px-3 py-1.5 border border-blue-500/20 bg-blue-500/5 text-blue-400">Webcam</span>
                            <span className="text-neutral-600">→</span>
                            <span className="px-3 py-1.5 border border-purple-500/20 bg-purple-500/5 text-purple-400">MediaPipe WASM</span>
                            <span className="text-neutral-600">→</span>
                            <span className="px-3 py-1.5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">21 Landmarks</span>
                            <span className="text-neutral-600">→</span>
                            <span className="px-3 py-1.5 border border-orange-500/20 bg-orange-500/5 text-orange-400">Spring Physics</span>
                            <span className="text-neutral-600">→</span>
                            <span className="px-3 py-1.5 border border-white/20 bg-white/5 text-white">DOM Update</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Layer 1: KineEngine */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <div className="text-xs font-mono text-neutral-600 tracking-widest uppercase">Layer 01</div>
                    <h2 className="text-xl font-mono tracking-widest uppercase text-white">KineEngine — The Singleton Core</h2>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                    The engine is a singleton that downloads the MediaPipe HandLandmarker WASM model once and reuses it across all page navigations. It manages the video element reference and exposes a single <code className="text-white bg-white/10 px-1.5 py-0.5">detectHands()</code> method that returns 21 landmark coordinates per hand per frame.
                </p>
                <CodeBlock code={`// Singleton — model downloads once, persists across navigations
const engine = KineEngine.getInstance();
await engine.initialize(videoElement);

// Called every frame at ~60fps
const result = engine.detectHands(performance.now());
// → { landmarks: [{ x, y, z }[21]], handedness: ["Left"|"Right"] }`} />

                <div className="border border-white/10 bg-[#050505] p-5 space-y-3">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Key Design Decisions</div>
                    <ul className="space-y-2 text-sm text-neutral-400">
                        <li className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">▸</span>
                            <span><strong className="text-white">Singleton pattern</strong> — The WASM model (~4MB) is loaded only once. Navigating between pages swaps the video element reference without re-downloading.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">▸</span>
                            <span><strong className="text-white">GPU delegation</strong> — The HandLandmarker runs on WebGL by default, keeping the main thread free for React rendering.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-emerald-500 mt-0.5">▸</span>
                            <span><strong className="text-white">Two-hand tracking</strong> — Configured for <code className="text-white bg-white/10 px-1 py-0.5">numHands: 2</code> enabling bimanual gestures like Pinch to Zoom.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Layer 2: KineProvider */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <div className="text-xs font-mono text-neutral-600 tracking-widest uppercase">Layer 02</div>
                    <h2 className="text-xl font-mono tracking-widest uppercase text-white">KineProvider — The React Bridge</h2>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                    The provider wraps your component tree with a hidden <code className="text-white bg-white/10 px-1.5 py-0.5">&lt;video&gt;</code> element and a <code className="text-white bg-white/10 px-1.5 py-0.5">requestAnimationFrame</code> loop. On each frame, it calls the engine, stores the latest landmarks in a ref, and exposes them via the <code className="text-white bg-white/10 px-1.5 py-0.5">useKine()</code> hook.
                </p>
                <CodeBlock code={`// Wrap any component tree to enable gesture detection
<KineProvider>
  <AirCursor />
  <SwipeArea>{children}</SwipeArea>
</KineProvider>

// Inside any child component:
const { landmarksRef } = useKine();
// landmarksRef.current → NormalizedLandmark[21] (updated every frame)`} />

                <div className="border border-white/10 bg-[#050505] p-5 space-y-3">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Why a Ref Instead of State?</div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        Landmark data updates at 60fps. Storing it in React state would trigger 60 re-renders per second across the entire tree. Instead, landmarks are stored in a <strong className="text-white">mutable ref</strong> (<code className="text-white bg-white/10 px-1 py-0.5">useRef</code>). Individual gesture components read from the ref inside their own animation loops, updating only what they need — typically a single <code className="text-white bg-white/10 px-1 py-0.5">framer-motion</code> spring value.
                    </p>
                </div>
            </section>

            {/* Layer 3: Gesture Components */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <div className="text-xs font-mono text-neutral-600 tracking-widest uppercase">Layer 03</div>
                    <h2 className="text-xl font-mono tracking-widest uppercase text-white">Gesture Components — The UI Layer</h2>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                    Each gesture component is a self-contained module that reads landmarks from the ref, applies its own physics and thresholding logic, and drives DOM updates via Framer Motion springs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: "Air Cursor", landmark: "Landmark 8", description: "Index fingertip position → cursor X/Y via spring physics" },
                        { name: "Swipe Area", landmark: "Landmark 0", description: "Wrist X velocity → lateral swipe detection with threshold" },
                        { name: "Air Scroll", landmark: "Landmark 0", description: "Wrist Y delta → scroll velocity with pinch-protection lockout" },
                        { name: "Pinch to Zoom", landmark: "Landmarks 4+8", description: "Thumb-index distance on both hands → scale factor" },
                    ].map((g) => (
                        <div key={g.name} className="border border-white/10 bg-[#050505] p-4 space-y-2">
                            <div className="text-sm font-mono text-white">{g.name}</div>
                            <div className="text-[10px] font-mono text-emerald-500/60 tracking-widest uppercase">{g.landmark}</div>
                            <div className="text-xs text-neutral-500">{g.description}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Landmark Map */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono tracking-widest uppercase text-white">Landmark Reference</h2>
                <p className="text-neutral-400 leading-relaxed">
                    MediaPipe returns 21 normalized landmarks per hand. Each coordinate is in the range [0, 1] relative to the video frame. Here are the key landmarks used by Kine UI components:
                </p>
                <div className="border border-white/10 bg-[#050505] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">hand_landmarks</span>
                    </div>
                    <div className="p-5">
                        <table className="w-full text-sm font-mono">
                            <thead>
                                <tr className="text-neutral-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                                    <th className="text-left pb-3 pr-4">Index</th>
                                    <th className="text-left pb-3 pr-4">Name</th>
                                    <th className="text-left pb-3">Used By</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral-400">
                                <tr className="border-b border-white/5">
                                    <td className="py-2.5 pr-4 text-white">0</td>
                                    <td className="py-2.5 pr-4">Wrist</td>
                                    <td className="py-2.5">Air Scroll, Swipe Area</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-2.5 pr-4 text-white">4</td>
                                    <td className="py-2.5 pr-4">Thumb Tip</td>
                                    <td className="py-2.5">Air Cursor (pinch), Pinch to Zoom</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="py-2.5 pr-4 text-white">8</td>
                                    <td className="py-2.5 pr-4">Index Finger Tip</td>
                                    <td className="py-2.5">Air Cursor (position), Pinch to Zoom</td>
                                </tr>
                                <tr>
                                    <td className="py-2.5 pr-4 text-white">12</td>
                                    <td className="py-2.5 pr-4">Middle Finger Tip</td>
                                    <td className="py-2.5 text-neutral-600">Reserved</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Performance */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono tracking-widest uppercase text-white">Performance Characteristics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Model Size", value: "~4MB", detail: "Downloaded once, cached by browser" },
                        { label: "Inference", value: "<16ms", detail: "GPU-accelerated via WebGL" },
                        { label: "Server Load", value: "0", detail: "All processing runs on client" },
                    ].map((stat) => (
                        <div key={stat.label} className="border border-white/10 bg-[#050505] p-5 text-center space-y-1">
                            <div className="text-2xl font-mono text-white">{stat.value}</div>
                            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-[11px] text-neutral-600">{stat.detail}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
