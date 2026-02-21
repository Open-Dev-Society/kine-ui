import Link from "next/link";
import { ArrowRight, Hand, Code2, Layers, Terminal } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <main className="relative mx-auto max-w-5xl px-6 py-24 flex flex-col items-center justify-center text-center min-h-[80vh]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Kine UI is currently in Beta
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
          Spatial Computing <br className="hidden md:block" />
          for the Modern Web
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12">
          A headless, copy-pasteable component registry for web-based hand gesture controls.
          Powered by MediaPipe explicitly designed for seamless React integration.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs/air-cursor"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            <Hand className="w-4 h-4" />
            Try Air Cursor
          </Link>
          <Link
            href="/docs/swipe-area"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            Try Swipe Area
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left w-full">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Copy & Paste</h3>
            <p className="text-neutral-400 text-sm">You own the code. Copy the registry components directly into your app and customize them however you want.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/30">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Locally Processed</h3>
            <p className="text-neutral-400 text-sm">MediaPipe Tasks Vision runs 100% locally via WebAssembly. Zero server latency and complete privacy constraint.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
              <Hand className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Accessible Motion</h3>
            <p className="text-neutral-400 text-sm">Built-in framer-motion physics automatically smooth out webcam jitter for a native spatial computing feel.</p>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="w-full max-w-3xl mt-32 text-left mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]">
              <Terminal className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Quick Start</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">1</div>
                <h3 className="font-semibold text-xl text-white">Initialize Kine UI</h3>
              </div>
              <p className="text-neutral-400 text-sm mb-6 pl-12 relative z-10">
                Scaffold your local components directory and automatically install the required computer vision dependencies (<code className="text-orange-300 bg-orange-500/10 rounded px-1 py-0.5">@mediapipe/tasks-vision</code> and <code className="text-blue-300 bg-blue-500/10 rounded px-1 py-0.5">framer-motion</code>).
              </p>
              <div className="pl-12 relative z-10">
                <CodeBlock code="npx @opendevsociety/kine-ui init" />
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">2</div>
                <h3 className="font-semibold text-xl text-white">Add Tracking Engine</h3>
              </div>
              <p className="text-neutral-400 text-sm mb-6 pl-12 relative z-10">
                Install the global provider. Wrap your root Next.js <code className="text-emerald-300 bg-emerald-500/10 rounded px-1 py-0.5">layout.tsx</code> inside this provider to automatically boot up the zero-re-render WASM hand tracking process.
              </p>
              <div className="pl-12 relative z-10">
                <CodeBlock code="npx @opendevsociety/kine-ui add kine-provider" />
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-1000" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">3</div>
                <h3 className="font-semibold text-xl text-white">Install Spatial Elements</h3>
              </div>
              <p className="text-neutral-400 text-sm mb-6 pl-12 relative z-10">
                Copy physics-based UI elements directly into your own codebase, giving you absolute control over styling variables and gesture sensitivity thresholds.
              </p>
              <div className="pl-12 space-y-3 relative z-10">
                <CodeBlock code="npx @opendevsociety/kine-ui add air-cursor" />
                <CodeBlock code="npx @opendevsociety/kine-ui add swipe-area" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
