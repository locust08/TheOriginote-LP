"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Leaf,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { StoreShell } from "@/components/store-shell";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC28KIuNKSJHKH9KaH385nNlnzobQn75K9jnCaMERZmLoB3KPjmEYqlEtmFxYj0mAaHdx_tqjgCAIIAjQ5xJIWpTi6F_wWthhEyWoP0Ekq-mGJEDdySW8uZmp4k4cIdW9TyH2tpNr63XFKdxTeZqvx4TcLn-s87zYO4TvYUur-Gge4jFRqTRHhlXWB6VbquJkF5UO8hfl2XrhlxqGWT1lMhykxUGwpEru2QZfcSPp3-Hw0Z0afSVFb54NRCXt9ubHzlwwHmXJaNooX3";

const founderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDInF3zEiSpegtrNm19FlE2KLqf4lAgSgBPu4SwrhFqQOwxz3bp951Cn_B0WFxTw_EV1Z6DbOJ94dULfoy_JTqAGFJKDHmptPCz6F-ecAtgLNNPq2Nh8ctueb91RE7yDRfD5Mur5dLYlKQ4YJJzP2kHRBv8I6c-Jq9gkwx5FDzNx0CbMhkI6ICjPtFE8T59xbgNFapsILRr3axTfkEMXqTEnTKCTSrtM2reRcrgnlrZ3scSP8FSfaMUGo5cIGFU-N-BzdoqRT5fYEnh";

const skinTypes = [
  {
    id: "oily",
    name: "Oily",
    description:
      "Oily skin often looks shiny and may have larger pores. Choose light textures that help balance oil without making skin feel dry.",
    image: "https://assets.unileversolutions.com/v1/136309769.png",
    icon: Sparkles,
  },
  {
    id: "dry",
    name: "Dry",
    description:
      "Dry skin can feel tight, rough, or flaky. Focus on creamy hydration and barrier-friendly products that keep moisture in.",
    image:
      "https://www.cetaphil.in/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-Galderma-IN-Library/default/dw869d0d25/2025Rebranding/Skincare-Guides_Dry-Skin.jpg",
    icon: Droplets,
  },
  {
    id: "combination",
    name: "Combination",
    description:
      "Combination skin is usually oily around the forehead and nose, with normal or dry cheeks. Use products that keep every zone comfortable.",
    image:
      "https://cdn.shopify.com/s/files/1/0609/6096/4855/files/Blog_Banners_22_7b39063a35.jpg?v=1765792797",
    icon: ShieldCheck,
  },
  {
    id: "sensitive",
    name: "Sensitive",
    description:
      "Sensitive skin can react quickly to strong formulas. Look for gentle, calming products with simple ingredient lists.",
    image:
      "https://yourbasicprinciple.com/cdn/shop/articles/Guide_to_Rosacea.png?v=1693881588&width=1100",
    icon: Leaf,
  },
  {
    id: "acne-prone",
    name: "Acne-Prone",
    description:
      "Acne-prone skin may break out easily or feel congested. Pick non-comedogenic products and avoid harsh routines.",
    image:
      "https://img.myshopline.com/image/store/2001032066/1653620038299/Everything-you-need-to-know-about-acne-prone-skin-hauscosmetics.jpeg?w=1200&h=702",
    icon: SunMedium,
  },
];

const routineSteps = [
  {
    step: "1",
    title: "Cleanse",
    description:
      "Wash away dirt, sunscreen, and extra oil with a gentle cleanser morning and night.",
  },
  {
    step: "2",
    title: "Tone & Hydrate",
    description:
      "Use toner, serum, or essence to add water back into the skin and prepare for moisturizer.",
  },
  {
    step: "3",
    title: "Protect",
    description:
      "Finish with moisturizer and sunscreen in the morning to keep the skin barrier supported.",
  },
];

const ritualImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARO97owLsg49un6XeL19H_ahPURxNNMsGnO1UY4vO-30x1BToXd4kLwzLgH7-wMUHDwuIQdImCRPt3C-dpc0j6rkIGkhG9r9iWLK1nB3H3CN7rQTWKM6okiUYu4x8-Ze__Hie4WeFqqyKi1kjEn28wqSpZBDEcSwCZGEU7ILLb1bK1rdgQt4R4Zs67LvURpwGJPFiRiwM2NjitTiZexANsSZ2qY-IqPHaYh5hdsKzc_nA78jF3EP2F8GjW0Kwr8a85mRxpLCW9jH2s",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjXHa2cuIejr7hwI_kNQf0WKnVA0QqX8m_Rt1XNWF3cih7cZdXOtnyDkhSmgMbRnl-mvH93PuFrF0_xolkRbjyz-4xN-fPtNsXt_1Nlzi__9fmgukxrBeZtCFCt6nykDvesgyi7mr9X0F9HLKTzFF3tDKxokJ6Mzq0ro6fSmPVkZcjHsWUOzwtEcGDNa0FORmW1IkNgcG7H56ttWmJU6AMsW1-ApUrllfoneioQ4Qu1cR_wZX9c45W7jyJrJYpeXKfwpbJbQHQxBQO",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAcEqUsKn0UoWucFOJHP6wOzu2CJJPKlFgEHa-8qi6shKB3XDV0wfPCC8sfpubaQo1Gta_tRUE-yERCvPtpsa3q3Feg_v7YJ8kcVRsViUMQk-2jANFl9RmTbhOrmVUHmjAifSsp_zQY_Ma6LnmrLjnmJb4NAiBkITTCv1kPyHAy69Hxhpo1BRCsDVg8gg7Xs_ghw-wWl877GrqANnkDecgIkTnQixLWxgbbClGn-wL73EFgWo2eAPQU4L9Ic5ARFx0pJoXhxt5THPZf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnaQ6wHTATJJSk7vLSLstSI_vPWr1ZK-uYiGBaEZ6u9rGDbUdAPwwen0lYVKrZ1aMONg8xZxGlWUyeWwOx8pUEJWTPL_8JrIUwVxnZGT9lHjqCSx3bJcc8UfQH8HfBKBNc-CHRhWI7izZGt2YI5KclfQiXA0BjEpCOjTICtqi2xecP8ubKoxlzV244gPoRozxg1MFpd7WU_IBq24LAWF-kCoNs0SA1LQIi6UTHKmTUdV2aBnLKJbwUhp-j4ZZs7esVpasdRsc0SAXu",
];

export function SkinTypePageContent() {
  const [hoveredSkinTypeId, setHoveredSkinTypeId] = useState<string | null>(null);
  const [selectedSkinTypeId, setSelectedSkinTypeId] = useState<string | null>(null);

  function isDescriptionVisible(skinTypeId: string) {
    return hoveredSkinTypeId === skinTypeId || selectedSkinTypeId === skinTypeId;
  }

  function toggleSelectedSkinType(skinTypeId: string) {
    setSelectedSkinTypeId((current) =>
      current === skinTypeId ? null : skinTypeId,
    );
  }

  return (
    <StoreShell>
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-12">
        <section className="relative mb-16 overflow-hidden rounded-[2rem] bg-[#17120f]">
          <div
            className="aspect-[21/9] w-full bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/75 via-black/25 to-transparent px-6 text-center sm:px-10">
            <span className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Editorial Guide
            </span>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              The Skin Type Guide
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Understanding your skin type is the first step to building a
              routine that feels simple, safe, and effective.
            </p>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold leading-tight">
                Identify Your Base
              </h2>
              <p className="mt-4 text-lg text-muted">
                Every skin type needs a different rhythm. Start with the one
                that feels closest to your skin today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px w-24 bg-primary/30" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Hover or tap
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            {skinTypes.map((skinType) => {
              const Icon = skinType.icon;
              const isActive = isDescriptionVisible(skinType.id);

              return (
                <button
                  key={skinType.id}
                  type="button"
                  onMouseEnter={() => setHoveredSkinTypeId(skinType.id)}
                  onMouseLeave={() => setHoveredSkinTypeId(null)}
                  onFocus={() => setHoveredSkinTypeId(skinType.id)}
                  onBlur={() => setHoveredSkinTypeId(null)}
                  onClick={() => toggleSelectedSkinType(skinType.id)}
                  className="group text-left"
                  aria-pressed={selectedSkinTypeId === skinType.id}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
                      style={{ backgroundImage: `url("${skinType.image}")` }}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "bg-gradient-to-t from-black/85 via-black/45 to-black/10"
                          : "bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                      }`}
                    />
                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/15 p-2 text-white backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {skinType.name}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isActive
                            ? "mt-3 max-h-36 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm leading-6 text-white/88">
                          {skinType.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] bg-accent p-8 md:p-12 lg:p-16">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-primary">
                The Essentials
              </span>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
                Basic Skincare Routine
              </h2>
              <div className="mt-8 space-y-8">
                {routineSteps.map((step) => (
                  <div key={step.step} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-xl text-base leading-7 text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/registration"
                  className="inline-flex items-center justify-between gap-4 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#241b17] shadow-[0_14px_30px_rgba(232,159,125,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(232,159,125,0.28)] sm:min-w-[254px] sm:whitespace-nowrap"
                >
                  Build Your Bundle
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-between gap-4 rounded-full border border-foreground/16 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:bg-surface-strong hover:text-primary sm:min-w-[254px] sm:whitespace-nowrap"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-4">
              {ritualImages.map((image, index) => (
                <div
                  key={image}
                  className={`aspect-square rounded-[1.5rem] bg-cover bg-center shadow-2xl ${
                    index === 1
                      ? "translate-y-8"
                      : index === 2
                        ? "-translate-y-4"
                        : index === 3
                          ? "translate-y-4"
                          : ""
                  }`}
                  style={{ backgroundImage: `url("${image}")` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 border-t border-primary/10 py-20 text-center">
          <p className="mx-auto max-w-3xl text-3xl leading-relaxed font-light italic text-muted">
            &quot;Skin care is not just about beauty. It is also about respect,
            comfort, and building a routine that supports your skin every
            day.&quot;
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url("${founderImage}")` }}
            />
            <div className="text-left">
              <p className="font-bold">Dr. Sarah Chen</p>
              <p className="text-xs text-muted">
                Chief Dermatologist, The Originote
              </p>
            </div>
          </div>
        </section>
      </div>
    </StoreShell>
  );
}
