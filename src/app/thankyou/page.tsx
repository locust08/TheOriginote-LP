import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getSelectedProducts,
  parseSelectedProductIds,
  productCatalog,
} from "@/lib/product-catalog";

type ThankYouPageProps = {
  searchParams?:
    | Promise<{
        name?: string;
        email?: string;
        skinType?: string;
        focus?: string;
        concerns?: string;
        items?: string | string[];
      }>
    | {
        name?: string;
        email?: string;
        skinType?: string;
        focus?: string;
        concerns?: string;
        items?: string | string[];
      };
};

export const metadata: Metadata = {
  title: "Your Personalized Routine | The Originote",
  description: "Your skincare consultation summary and personalized routine.",
};

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 9V7a2.8 2.8 0 0 1 5.6 0v2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3.5 14.2 9l5.3 2.1-5.3 2.1-2.2 5.3-2.2-5.3-5.3-2.1L9.8 9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconVerified() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m8.5 12 2.2 2.2L15.5 9" stroke="currentColor" strokeWidth="1.9" />
      <path d="M12 3.5 19 6v6c0 4-2.8 6.8-7 8-4.2-1.2-7-4-7-8V6l7-2.5Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M19.5 4.5C11 5 6 10.2 6 16c0 2.3 1.8 4 4 4 5.8 0 11-5 11.5-13.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 16.5c1.5-2 3.5-4 6.5-6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconCrueltyFree() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M12 20c5 0 8-3.2 8-7.4 0-4.5-3.7-7.6-8-7.6s-8 3.1-8 7.6C4 16.8 7 20 12 20Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8 7.2 5.5M15 8l1.8-2.5M10 13.4c.7.7 1.3 1.1 2 1.1s1.3-.4 2-1.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconWorld() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="6.5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolved = await Promise.resolve(searchParams ?? {});
  const selectedIds = parseSelectedProductIds(resolved.items);
  const selectedProducts = getSelectedProducts(selectedIds);
  const recommended = selectedProducts[0] ?? productCatalog[0];

  const name = (resolved.name ?? "Michelle Adams").trim();
  const firstName = name.split(" ")[0] || "Michelle";
  const email = (resolved.email ?? "michelle@example.com").trim();
  const skinType = (resolved.skinType ?? "Dry").trim();
  const focus = (resolved.focus ?? "Anti-Aging & Glow").trim();

  const concerns =
    resolved.concerns && resolved.concerns.length > 0
      ? resolved.concerns.split(",").map((item) => toTitleCase(item.trim())).filter(Boolean)
      : ["Dullness", "Fine Lines", "Redness"];

  const shopHref =
    selectedProducts.length > 0
      ? `/products?query=${encodeURIComponent(selectedProducts[0].name)}`
      : "/products";

  const guideText = [
    "THE ORIGINOTE - PERSONALIZED ROUTINE GUIDE",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Skin Type: ${skinType}`,
    `Focus: ${focus}`,
    `Concerns: ${concerns.join(", ")}`,
    "",
    `Recommended Hero: ${recommended.name}`,
  ].join("\n");
  const downloadHref = `data:text/plain;charset=utf-8,${encodeURIComponent(guideText)}`;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 blur-[80px] opacity-60">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-primary animate-pulse" />
        <div className="absolute -right-20 top-1/2 h-[600px] w-[600px] rounded-full bg-accent opacity-80" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/30" />
      </div>

      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-background/70 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-xs"
        >
          <IconMenu />
          Menu
        </Link>
        <h1 className="text-center text-sm font-medium tracking-[0.24em] sm:text-xl sm:tracking-[0.2em]">
          THE ORIGINOTE
        </h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/products"
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background lg:flex"
          >
            Search
            <IconSearch />
          </Link>
          <Link
            href={shopHref}
            className="relative rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
          >
            <IconBag />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-background">
              {selectedProducts.length}
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex flex-grow items-center justify-center py-12 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
                Your Skin Analysis
              </h2>
              <h1 className="text-4xl leading-tight italic lg:text-5xl">
                Thank you for your trust, {firstName}!
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
                We&apos;ve analyzed your{" "}
                <span className="font-semibold text-primary">{skinType}</span>{" "}
                skin and curated a ritual to address your concerns:{" "}
                <span className="italic">{concerns.join(", ")}.</span>
              </p>
            </div>

            <div className="group relative mx-auto max-w-sm lg:mx-0">
              <div className="absolute inset-0 rounded-[3rem] bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
              <Image
                alt={recommended.name}
                src={recommended.image}
                width={420}
                height={500}
                className="relative rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute -bottom-6 -right-6 flex items-center gap-4 rounded-2xl border border-line bg-surface-strong p-6 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <IconSparkle />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
                    Recommended Hero
                  </p>
                  <p className="text-sm font-medium">{recommended.name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-surface-strong/20 bg-surface/85 p-8 shadow-2xl shadow-black/5 backdrop-blur-xl lg:p-12">
              <h3 className="mb-8 border-b border-line pb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                Consultation Summary
              </h3>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted">
                      Name
                    </label>
                    <p className="text-sm font-medium">{name}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted">
                      Email
                    </label>
                    <p className="truncate text-sm font-medium">{email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted">
                      Skin Type
                    </label>
                    <p className="text-sm font-medium">{skinType}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-muted">
                      Focus
                    </label>
                    <p className="text-sm font-medium">{focus}</p>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted">
                    Addressing Concerns
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((concern) => (
                      <span
                        key={concern}
                        className="rounded-full bg-accent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <Link
                  href={shopHref}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-5 text-xs font-bold uppercase tracking-[0.2em] text-background shadow-xl shadow-primary/20 transition-all hover:bg-foreground"
                >
                  Shop My Recommendations
                  <IconArrowRight />
                </Link>
                <a
                  href={downloadHref}
                  download="originote-routine-guide.txt"
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-line py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent"
                >
                  <IconDownload />
                  Download My Routine Guide
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-muted">
              <div className="flex flex-col items-center">
                <span className="mb-2">
                  <IconVerified />
                </span>
                <span className="text-[8px] uppercase tracking-widest">
                  Dermatologist Tested
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">
                  <IconLeaf />
                </span>
                <span className="text-[8px] uppercase tracking-widest">
                  Clean Ingredients
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">
                  <IconCrueltyFree />
                </span>
                <span className="text-[8px] uppercase tracking-widest">
                  Cruelty Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line bg-surface/50 px-4 py-12 backdrop-blur-sm sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <h2 className="text-xl tracking-[0.2em] text-muted">THE ORIGINOTE</h2>
          <div className="flex gap-10 text-[10px] uppercase tracking-widest text-muted">
            <Link href="/" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              Support
            </Link>
          </div>
          <div className="flex gap-4">
            <a
              className="opacity-40 transition-opacity hover:opacity-100"
              href="https://www.theoriginote.com"
              target="_blank"
              rel="noreferrer"
            >
              <IconWorld />
            </a>
            <a
              className="opacity-40 transition-opacity hover:opacity-100"
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <IconCamera />
            </a>
            <a
              className="opacity-40 transition-opacity hover:opacity-100"
              href="mailto:support@theoriginote.com"
            >
              <IconMail />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-line pt-8 text-center">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            © 2024 The Originote. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
