import Link from "next/link";
import { ArrowRight, Hand, Code2, Layers } from "lucide-react";

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
      </main>
    </div>
  );
}
