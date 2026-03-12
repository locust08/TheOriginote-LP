import type { Metadata } from "next";
import { SkinTypePageContent } from "@/components/skin-type-page-content";

export const metadata: Metadata = {
  title: "Skin Type Guide | The Originote",
  description:
    "A simple guide to help you understand your skin type and start a better routine.",
};

export default function SkinTypePage() {
  return <SkinTypePageContent />;
}
