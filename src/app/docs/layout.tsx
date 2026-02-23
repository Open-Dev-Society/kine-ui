"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-1 w-full max-w-7xl mx-auto md:flex-row">
            <Sidebar />
            <main className="flex-1 min-w-0 px-6 py-12 md:py-16 md:px-12 w-full" key={pathname}>
                {children}
            </main>
        </div>
    );
}
