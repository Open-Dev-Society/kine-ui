import { CodeBlock } from "@/components/ui/CodeBlock";
import { Terminal, Lightbulb } from "lucide-react";

export default function InstallationPage() {
    return (
        <div className="max-w-3xl">
            <div className="mb-10">
                <h1 className="font-semibold tracking-tighter text-4xl mb-4 text-white">Installation</h1>
                <p className="text-lg text-neutral-400">
                    How to install Kine UI components and set up the MediaPipe vision engine in your Next.js application.
                </p>
            </div>

            <div className="space-y-12">

                {/* Step 1 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <h2 className="text-xl font-mono tracking-widest text-white uppercase">Initialize System Core</h2>
                    </div>
                    <div className="ml-[3px] pl-6 border-l border-white/10 space-y-6">
                        <p className="text-neutral-400">
                            Run the <code>init</code> command to scaffold your local <code>components/kine</code> directory.
                            This will automatically install the required computer vision dependencies (<code className="text-orange-300 bg-orange-500/10 rounded px-1.5 py-0.5 text-sm">@mediapipe/tasks-vision</code> and <code className="text-blue-300 bg-blue-500/10 rounded px-1.5 py-0.5 text-sm">framer-motion</code>).
                        </p>
                        <CodeBlock code="npx @opendevsociety/kine-ui@latest init" />

                        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4">
                            <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-100/80">
                                <p className="font-medium text-blue-300 mb-1">Zero Server Load</p>
                                <p>MediaPipe runs its neural networks 100% locally on the user's device via WebAssembly. Kine UI offloads no processing to your servers.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step 2 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <h2 className="text-xl font-mono tracking-widest text-white uppercase">Mount Tracking Engine</h2>
                    </div>
                    <div className="ml-[3px] pl-6 border-l border-white/10 space-y-6">
                        <p className="text-neutral-400">
                            Install the global context provider. You must wrap your root Next.js <code className="text-emerald-300 bg-emerald-500/10 rounded px-1.5 py-0.5 text-sm">layout.tsx</code> inside this provider.
                            This acts as a singleton engine that boots up the background webcam tracking process exactly once.
                        </p>
                        <CodeBlock code="npx @opendevsociety/kine-ui@latest add kine-provider" />
                        <p className="text-sm text-neutral-500">
                            If an interactive spatial component detects this provider, it taps into the engine's <code>requestAnimationFrame</code> loop to read 3D coordinates.
                        </p>
                    </div>
                </section>

                {/* Step 3 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <h2 className="text-xl font-mono tracking-widest text-white uppercase">Install Spatial Elements</h2>
                    </div>
                    <div className="ml-[3px] pl-6 border-l border-white/10 space-y-6">
                        <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                            {`> Select individual spatial elements from the registry. Execute the deployment command listed on each component documentation page to inject the physics layer directly into your environment.`}
                        </p>
                    </div>
                </section>

                {/* Next Steps */}
                <div className="pt-8 mt-12 border-t border-white/10 flex items-center justify-between">
                    <div className="text-neutral-500 text-sm">We recommend starting with the <strong className="text-white">Air Cursor</strong>.</div>
                    <a href="/docs/air-cursor" className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
                        Read Air Cursor Docs
                        <span className="text-lg leading-none">&rarr;</span>
                    </a>
                </div>

            </div>
        </div>
    );
}
