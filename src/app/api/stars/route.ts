import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.github.com/repos/open-dev-society/kine-ui", {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json",
            },
            next: { revalidate: 3600 },
        });
        if (!res.ok) return NextResponse.json({ stars: null });
        const data = await res.json();
        return NextResponse.json({ stars: data.stargazers_count ?? null });
    } catch {
        return NextResponse.json({ stars: null });
    }
}
