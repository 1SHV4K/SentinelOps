import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SentinelOps | Configuration Security & Drift Monitoring",
  description: "Local simulated-fleet configuration monitoring, explicit baselines, and deterministic drift findings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
