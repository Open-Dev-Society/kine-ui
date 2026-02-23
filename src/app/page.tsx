import Link from "next/link";
import { ChevronRight, Copy, Terminal, Github } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { StarCount } from "@/components/ui/StarCount";
import { KineLogo } from "@/components/ui/KineLogo";

async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/open-dev-society/kine-ui", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const stars = await getStarCount();
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white selection:bg-white/20">

      {/* Ultra-subtle, clean background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <main className="flex-1 w-full relative z-10">

        {/* Deep Tech IDE-style Hero Section */}
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 pt-28 lg:pt-30 px-6">

          <div className="inline-flex items-center border border-white/10 bg-[#050505] px-3 py-1.5 text-xs font-mono text-neutral-400 mb-6 shadow-2xl">
            <span className="flex items-center gap-2 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {`> introducing kine-ui`}
            </span>
          </div>

          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] mt-2 mb-4 max-w-[800px]">
            Deploy native spatial <br className="hidden sm:block" />
            <span className="text-neutral-500">computing to the DOM.</span>
          </h1>

          <span className="max-w-[750px] text-center text-lg text-neutral-400 sm:text-lg font-medium leading-relaxed">
            Beautifully designed hand-gesture components that you can copy and paste into your apps. Accessible. Customizable. Fully Open Source.
          </span>

          <div className="flex w-full items-center justify-center flex-col sm:flex-row gap-3 sm:gap-4 py-4 mt-6">
            <Link
              href="/docs/installation"
              className="inline-flex items-center justify-center rounded-sm text-xs font-mono uppercase tracking-widest font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-neutral-200 h-10 px-8 py-2 border border-transparent shadow shadow-white/20 w-full sm:w-auto"
            >
              [ Get Started ]
            </Link>
            <a
              href="https://github.com/open-dev-society/kine-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-sm text-xs font-mono uppercase tracking-widest font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50 border border-white/10 bg-transparent hover:bg-white/5 h-10 px-8 py-2 text-neutral-300 w-full sm:w-auto"
            >
              <Github className="mr-3 h-4 w-4 text-neutral-500" />
              Source_Code
            </a>
          </div>

          {/* IDE-style Inline CLI */}
          <div className="flex w-full items-center justify-center mt-6 px-2 sm:px-0">
            <div className="flex items-center justify-between border border-white/10 bg-[#050505] pl-4 pr-1.5 py-1.5 font-mono text-sm text-neutral-400 w-full sm:w-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-emerald-500/50" />
              <div className="flex items-center space-x-3 mr-4 sm:mr-8 text-neutral-300 min-w-0 overflow-hidden">
                <span className="text-emerald-500 shrink-0">{`$`}</span>
                <span className="text-white text-[12px] sm:text-[13px] truncate">npx @opendevsociety/kine-ui@latest init</span>
              </div>
              <CopyButton text="npx @opendevsociety/kine-ui@latest init" />
            </div>
          </div>
        </section>

        {/* Shadcn-style Architecture/Feature Cards */}
        <section className="container mx-auto max-w-[980px] px-6 pb-24 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Feature Card 1 */}
            <div className="rounded-xl border border-white/10 bg-[#111] text-white shadow-sm p-6 flex flex-col space-y-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-semibold tracking-tight text-lg relative z-10">Copy and Paste</div>
              <p className="text-sm text-neutral-400 leading-relaxed relative z-10">
                Components are completely headless. You copy the raw source code into your project. You own the execution. You can tweak the logic, styling, and framer-motion physics directly.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="rounded-xl border border-white/10 bg-[#111] text-white shadow-sm p-6 flex flex-col space-y-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-semibold tracking-tight text-lg relative z-10">MediaPipe Core</div>
              <p className="text-sm text-neutral-400 leading-relaxed flex-1 relative z-10">
                Powered by Google's incredibly fast MediaPipe Tasks Vision API. The entire hand-tracking pipeline runs deeply optimized in WebAssembly, completely locally on the client.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="rounded-xl border border-white/10 bg-[#111] text-white shadow-sm p-6 flex flex-col space-y-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-semibold tracking-tight text-lg relative z-10">Framer Motion</div>
              <p className="text-sm text-neutral-400 leading-relaxed relative z-10">
                Raw landmark data from the webcam is inherently jittery. We pass all spatial coordinates directly into Framer Motion spring physics to guarantee buttery smooth UI updates.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="rounded-xl border border-white/10 bg-[#111] text-white shadow-sm p-6 flex flex-col space-y-3 md:col-span-2 relative overflow-hidden group">
              <div className="font-semibold tracking-tight text-lg relative z-10">Accessible Design</div>
              <p className="text-sm text-neutral-400 leading-relaxed relative z-10">
                Components automatically degrade gracefully. If users do not grant camera access, or if they are on mobile devices without ideal viewing angles, the components cleanly fallback to standard mouse/touch interaction.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="rounded-xl border border-white/10 bg-[#111] text-white shadow-sm p-6 flex flex-col space-y-3 md:col-span-1 relative overflow-hidden group">
              <div className="font-semibold tracking-tight text-lg relative z-10">NPM Registry</div>
              <p className="text-sm text-neutral-400 leading-relaxed relative z-10">
                Just like shadcn/ui, you don't install a heavy package. You run <code className="bg-[#1a1a1a] border border-white/10 px-1.5 py-0.5 rounded text-white font-mono text-xs">npx @opendevsociety/kine-ui add</code> to fetch exact files.
              </p>
            </div>

          </div>
        </section>

        {/* Spatial Canvas HUD */}
        <section className="container mx-auto max-w-[980px] px-6 py-12 md:py-32 border-t border-white/10">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Spatial Canvas</h2>
            <p className="text-neutral-400 text-lg max-w-[600px]">
              Deploy native OS-level spatial components directly into the DOM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* HUD Card 1 - Air Cursor */}
            <div className="rounded-xl border border-white/10 bg-[#050505] p-6 flex flex-col relative overflow-hidden group shadow-2xl h-[280px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="absolute right-0 top-0 text-[10px] uppercase tracking-widest font-mono text-neutral-600">SYS_CURSOR_01</div>

                <div className="flex-1 flex items-center justify-center relative">
                  <div className="relative w-16 h-16 rounded-full border border-blue-500/20 flex items-center justify-center">
                    <div className="absolute w-24 h-[1px] bg-blue-500/10 rotate-45" />
                    <div className="absolute w-24 h-[1px] bg-blue-500/10 -rotate-45" />
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)] animate-pulse" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-medium tracking-tight text-white mb-2">Air Cursor</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">Index-finger spatial tracking. Pinch velocity thresholding for ultra-precise DOM clicks.</p>
                </div>
              </div>
            </div>

            {/* HUD Card 2 - Swipe Area */}
            <div className="rounded-xl border border-white/10 bg-[#050505] p-6 flex flex-col relative overflow-hidden group shadow-2xl h-[280px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="absolute right-0 top-0 text-[10px] uppercase tracking-widest font-mono text-neutral-600">KIN_SWIPE_AXIS</div>

                <div className="flex-1 flex items-center justify-center relative gap-6">
                  <div className="w-8 h-[1px] bg-emerald-500/20" />
                  <div className="w-16 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] relative overflow-hidden" />
                  <div className="w-8 h-[1px] bg-emerald-500/20" />
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-medium tracking-tight text-white mb-2">Swipe Area</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">High-velocity palm tracking. Triggers strictly on sweeping lateral mass reduction.</p>
                </div>
              </div>
            </div>
            {/* HUD Card 3 - Air Scroll */}
            <div className="rounded-xl border border-white/10 bg-[#050505] p-6 flex flex-col relative overflow-hidden group shadow-2xl h-[280px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="absolute right-0 top-0 text-[10px] uppercase tracking-widest font-mono text-neutral-600">PALM_SCROLL_Y</div>

                <div className="flex-1 flex items-center justify-center relative">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-[1px] h-8 bg-sky-500/20" />
                    <div className="w-[2px] h-10 bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.6)] relative" />
                    <div className="w-[1px] h-8 bg-sky-500/20" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-medium tracking-tight text-white mb-2">Air Scroll</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">Wrist Y-axis velocity mapping. Hands-free page scrolling with native pinch-protection lockout.</p>
                </div>
              </div>
            </div>

            {/* HUD Card 4 - Pinch To Zoom */}
            <div className="rounded-xl border border-white/10 bg-[#050505] p-6 flex flex-col relative overflow-hidden group shadow-2xl h-[280px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="absolute right-0 top-0 text-[10px] uppercase tracking-widest font-mono text-neutral-600">BIMANUAL_SCALE</div>

                <div className="flex-1 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border border-orange-500/10 rounded-lg" />
                  </div>
                  <div className="w-12 h-12 border border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)] rounded-md flex items-center justify-center bg-orange-500/5">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-sm" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-medium tracking-tight text-white mb-2">Pinch to Zoom</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">Bimanual multi-hand Euclidean scaling. Manipulate DOM scale factors linearly.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Physics Engine Terminal block */}
        <section className="container mx-auto max-w-[980px] px-6 py-12 md:py-32 border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-16 items-center">

            {/* Description */}
            <div className="flex-1 space-y-6 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Physics Engine</h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-[450px]">
                Raw landmark data from the webcam is inherently jittery. Kine UI pipes all spatial coordinates directly into
                <span className="text-white font-medium"> framer-motion</span> spring physics to guarantee absolute fluid UI updates.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <div className="h-[1px] w-12 bg-white/20" />
                <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">Wasm_To_Spring_Runtime</span>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 w-full max-w-[500px] relative z-10">
              <div className="rounded-xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden backdrop-blur-3xl">

                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-500 tracking-wider">SOCKET_OPEN</span>
                  </div>
                </div>

                <div className="flex flex-col h-[300px]">
                  <div className="p-5 border-b border-white/10 bg-black/40 h-1/2 overflow-hidden relative flex flex-col justify-end">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none z-10" />
                    <div className="font-mono text-xs text-neutral-600 leading-relaxed">
                      <div>[sys] alloc matrix 4x4...</div>
                      <div>{`> L[0] { x: 0.124, y: 0.881, z: -0.01 }`}</div>
                      <div>{`> L[0] { x: 0.128, y: 0.875, z: -0.01 }`}</div>
                      <div>{`> L[0] { x: 0.131, y: 0.860, z: -0.01 }`}</div>
                      <div className="text-neutral-300">{`> INTERCEPT VELOCITY: 4.2px/f`}</div>
                    </div>
                  </div>
                  <div className="p-6 font-mono text-xs leading-relaxed bg-transparent text-neutral-400 h-1/2">
                    <span className="text-purple-400">const</span> cursorX = useSpring(<span className="text-blue-400">0</span>, {"{"} <br />
                    &nbsp;&nbsp;damping: <span className="text-orange-400">20</span>,<br />
                    &nbsp;&nbsp;stiffness: <span className="text-orange-400">300</span>,<br />
                    &nbsp;&nbsp;mass: <span className="text-orange-400">0.5</span><br />
                    {"}"});<br />
                    <span className="text-neutral-600 mt-3 block">// Hardware-accelerated repaint</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Premium Bottom CTA */}
        <section className="container mx-auto max-w-[980px] px-6 py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 w-full">
            {/* Top Stats Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-8 px-1">
              <span>SYS_DEPLOY_READY</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> All Systems Nominal</span>
            </div>

            {/* Main CTA Card */}
            <div className="border border-white/10 bg-[#020202] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              {/* CTA Header Strip */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">Deploy.Sequence</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-700 tracking-widest">v0.1.0</span>
              </div>

              {/* CTA Content */}
              <div className="flex flex-col items-center text-center px-4 sm:px-6 py-12 md:py-20 space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono tracking-widest uppercase text-white">Start Building</h2>
                  <p className="text-neutral-500 text-xs sm:text-sm font-mono max-w-[500px] leading-relaxed mx-auto">
                    {`> Two commands to go from zero to spatial computing. The init script scaffolds the engine, installs dependencies, and mounts the tracking core automatically.`}
                  </p>
                </div>

                {/* Command Preview */}
                <div className="w-full max-w-[500px] border border-white/10 bg-[#050505] relative group">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                    <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">terminal</span>
                  </div>
                  <div className="p-4 font-mono text-xs sm:text-sm text-neutral-300 overflow-x-auto">
                    <span className="text-emerald-500 select-none mr-2">$</span>
                    npx @opendevsociety/kine-ui@latest init
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text="npx @opendevsociety/kine-ui@latest init" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 w-full max-w-[500px]">
                  <Link
                    href="/docs/installation"
                    className="w-full sm:flex-1 inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 h-12 px-8 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    [ Read the Docs ]
                  </Link>
                  <a
                    href="https://github.com/open-dev-society/kine-ui"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-none inline-flex items-center justify-center border border-white/10 bg-transparent hover:bg-white/5 h-12 px-4 w-full sm:w-auto transition-colors text-neutral-400 hover:text-white"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-0 px-4 sm:px-6 py-3 border-t border-white/5 bg-white/[0.01] text-[10px] font-mono text-neutral-700 tracking-widest uppercase">
                <span>Components: 4</span>
                <span>Runtime: WebAssembly</span>
                <span className="hidden sm:inline">Latency: &lt;16ms</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Premium Footer */}
      <footer className="border-t border-white/10 bg-[#000] relative z-20">

        {/* Footer Main Content */}
        <div className="container mx-auto max-w-[980px] px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-white uppercase">
                <KineLogo className="w-6 h-6 text-white" />
                [ Kine UI ]
              </div>
              <p className="text-sm text-neutral-500 font-mono leading-relaxed max-w-sm">
                Open-source spatial computing primitives for React. Ship gesture-driven interfaces with zero server load.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com/open-dev-society/kine-ui" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2.5">
                <li><Link href="/docs/installation" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Installation</Link></li>
                <li><Link href="/docs/air-cursor" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Air Cursor</Link></li>
                <li><Link href="/docs/swipe-area" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Swipe Area</Link></li>
                <li><Link href="/docs/air-scroll" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Air Scroll</Link></li>
                <li><Link href="/docs/pinch-to-zoom" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Pinch to Zoom</Link></li>
              </ul>
            </div>

            {/* Project Column */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Project</h4>
              <ul className="space-y-2.5">
                <li><a href="https://github.com/open-dev-society/kine-ui" target="_blank" rel="noreferrer" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Source Code</a></li>
                <li><a href="https://github.com/open-dev-society/kine-ui/issues" target="_blank" rel="noreferrer" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">Issues</a></li>
                <li><a href="https://www.npmjs.com/package/@opendevsociety/kine-ui" target="_blank" rel="noreferrer" className="text-sm font-mono text-neutral-500 hover:text-white transition-colors">NPM Package</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto max-w-[980px] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
              <span className="flex items-center gap-2"><span className="text-neutral-500">VERSION:</span> 0.1.0-beta</span>
              <span className="hidden sm:inline-flex items-center gap-2 border-l border-white/10 pl-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-500/60">SYS_ONLINE</span>
              </span>
            </div>
            <div className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
              © 2025 Open Dev Society
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
