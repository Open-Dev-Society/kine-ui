import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kine UI Documentation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#0a0a0a",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(to right, #80808010 1px, transparent 1px), linear-gradient(to bottom, #80808010 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "#050505",
                        padding: "8px 16px",
                        fontSize: 14,
                        color: "#10b981",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#10b981",
                        }}
                    />
                    Documentation
                </div>

                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        textAlign: "center",
                    }}
                >
                    Kine UI Docs
                </div>

                <div
                    style={{
                        fontSize: 24,
                        color: "#737373",
                        marginTop: "16px",
                        textAlign: "center",
                        maxWidth: "700px",
                        lineHeight: 1.5,
                    }}
                >
                    Hand gesture components for React — installation, architecture, and API reference
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 40px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        fontSize: 13,
                        color: "#525252",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                    }}
                >
                    <span>kine-ui.vercel.app/docs</span>
                    <span>Open Dev Society</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
