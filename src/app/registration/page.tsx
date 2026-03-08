"use client";

import { FormEvent, Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSelectedProducts, parseSelectedProductIds } from "@/lib/product-catalog";

const pages = [
  { label: "Landing", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Registration", href: "/registration" },
  { label: "Thank You", href: "/thankyou" },
];

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

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
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

function RegistrationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedIds = parseSelectedProductIds(searchParams.get("items") ?? undefined);
  const selectedProducts = getSelectedProducts(selectedIds);
  const hasSelectedProducts = selectedProducts.length > 0;
  const heroImage = hasSelectedProducts ? selectedProducts[0].image : null;

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchText.trim();
    router.push(query ? `/products?query=${encodeURIComponent(query)}` : "/products");
  }

  async function handleRegistrationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const concerns = formData.getAll("concerns").map((value) => String(value));
    const name = String(formData.get("fullName") ?? "").trim() || "Michelle";
    const email =
      String(formData.get("email") ?? "").trim() || "michelle@example.com";
    const skinType = String(formData.get("skinType") ?? "").trim() || "Dry";
    const focus =
      String(formData.get("category") ?? "").trim() || "Daily Routine";

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          skinType,
          category: focus,
          concerns,
          selectedProductIds: selectedIds,
        }),
      });

      const responseBody = (await response
        .json()
        .catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSubmitError(
          responseBody?.error ??
            "We could not save your details. Please try again.",
        );
        return;
      }
    } catch (error) {
      console.error("Registration submission failed:", error);
      setSubmitError("Unable to connect right now. Please try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }

    const params = new URLSearchParams();
    params.set("name", name);
    params.set("email", email);
    params.set("skinType", skinType);
    params.set("focus", focus);

    if (concerns.length > 0) {
      params.set("concerns", concerns.join(","));
    }

    if (selectedIds.length > 0) {
      params.set("items", selectedIds.join(","));
    }

    router.push(`/thankyou?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-background/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-12">
        <div className="relative">
          <button
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-xs"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <IconMenu />
            Menu
          </button>
          {isMenuOpen ? (
            <div className="absolute left-0 top-11 w-52 rounded-2xl border border-line bg-surface-strong p-3 shadow-2xl">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-muted">
                Pages
              </p>
              <div className="space-y-1">
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="block rounded-xl px-3 py-2 text-sm transition hover:bg-accent hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <h1 className="text-center text-sm font-medium tracking-[0.24em] sm:text-xl sm:tracking-[0.2em]">
          THE ORIGINOTE
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background lg:flex"
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            Search
            <IconSearch />
          </button>
          <button
            className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background lg:hidden"
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Open search"
          >
            <IconSearch />
          </button>
          <button
            className="relative rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open selected products"
          >
            <IconBag />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-background">
              {selectedProducts.length}
            </span>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {isSearchOpen ? (
        <div className="border-b border-line bg-surface/80 px-4 py-3 sm:px-6 lg:px-12">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-7xl gap-3">
            <label className="sr-only" htmlFor="registration-search">
              Search products
            </label>
            <input
              id="registration-search"
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-line bg-surface-strong px-5 py-3 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-primary"
            >
              Go
            </button>
          </form>
        </div>
      ) : null}

      <main className="flex-grow">
        <section className="mx-auto max-w-7xl px-4 pb-8 pt-16 text-center sm:px-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">
            Your Journey to Glowing Skin
          </h2>
          <p className="mx-auto max-w-2xl text-3xl leading-tight italic lg:text-4xl">
            Personalized Skin Consultation
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Complete your profile to receive a personalized regimen tailored to
            your selected products and skin needs.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="flex min-h-[700px] flex-col overflow-hidden rounded-[2.5rem] bg-surface-strong shadow-2xl shadow-black/5 lg:flex-row">
            <div className="relative flex flex-col bg-accent/35 lg:w-5/12">
              <div className="z-10 space-y-8 p-8 lg:p-10">
                <div>
                  <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Your Selection
                  </h3>

                  {hasSelectedProducts ? (
                    <div className="space-y-4">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 backdrop-blur-sm"
                        >
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-surface-strong">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={56}
                              height={56}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[9px] uppercase tracking-widest text-muted">
                              {product.subtitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-line bg-surface/70 p-6 text-center">
                      <p className="text-sm text-muted">No products selected yet.</p>
                      <Link
                        href="/products"
                        className="mt-4 inline-flex rounded-full bg-primary px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition hover:bg-foreground"
                      >
                        Select Your Products
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {heroImage ? (
                <div className="relative mt-auto h-64 lg:h-full">
                  <Image
                    src={heroImage}
                    alt="Selected skincare aesthetic"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </div>
              ) : null}
            </div>

            <div className="flex-1 p-8 lg:p-16">
              <form className="space-y-12" onSubmit={handleRegistrationSubmit}>
                <div className="space-y-6">
                  <h3 className="border-b border-line pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    01. Personal Details
                  </h3>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Michelle"
                        className="w-full border-0 border-b border-line bg-transparent px-0 pb-2 text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Michelle@example.com"
                        className="w-full border-0 border-b border-line bg-transparent px-0 pb-2 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="border-b border-line pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    02. Skin Profile
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        Skin Type
                      </label>
                      <select
                        name="skinType"
                        className="w-full appearance-none border-0 border-b border-line bg-transparent px-0 pb-2 text-sm outline-none"
                      >
                        <option value="">Select your skin type</option>
                        <option value="Oily">Oily</option>
                        <option value="Dry">Dry</option>
                        <option value="Combination">Combination</option>
                        <option value="Sensitive">Sensitive</option>
                        <option value="Normal">Normal</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                        Skin Concerns (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {[
                          "Acne",
                          "Dullness",
                          "Fine Lines",
                          "Pores",
                          "Redness",
                          "Pigmentation",
                        ].map((concern) => (
                          <label
                            key={concern}
                            className="group flex cursor-pointer items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              name="concerns"
                              value={concern}
                              className="h-4 w-4 rounded-sm border-line accent-primary"
                            />
                            <span className="text-xs transition-colors group-hover:text-primary">
                              {concern}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="border-b border-line pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    03. Preferences
                  </h3>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted">
                      Preferred Category
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {["Daily Routine", "Intensive Care", "Essentials"].map(
                        (choice) => (
                          <label
                            key={choice}
                            className="group flex cursor-pointer items-center gap-3"
                          >
                            <input
                              type="radio"
                              name="category"
                              value={choice}
                              className="h-4 w-4 border-line accent-primary"
                            />
                            <span className="text-xs transition-colors group-hover:text-primary">
                              {choice}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-primary py-5 text-xs font-bold uppercase tracking-[0.2em] text-background shadow-xl shadow-primary/20 transition-all hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                  {submitError ? (
                    <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-widest text-red-600">
                      {submitError}
                    </p>
                  ) : null}
                  <p className="mt-6 text-center text-[9px] font-medium uppercase tracking-widest text-muted">
                    By clicking, you agree to receive a personalized routine
                    analysis.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {isCartOpen ? (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/30">
          <div className="h-full w-full max-w-md overflow-y-auto bg-surface-strong p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium uppercase tracking-[0.2em]">
                Selected Items
              </h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
              >
                <IconClose />
              </button>
            </div>

            {hasSelectedProducts ? (
              <div className="space-y-4">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3"
                  >
                    <div className="h-14 w-14 overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-primary">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                No items selected. You can still complete and submit this form.
              </p>
            )}

            <div className="mt-8 space-y-3">
              <Link
                href="/products"
                className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-foreground"
              >
                Select Products
              </Link>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-full rounded-full border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background"
              >
                Continue Registration
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="border-t border-line bg-accent/85 px-4 py-12 sm:px-6 lg:px-12">
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
              href="https://www.theoriginote.com"
              className="opacity-40 transition-opacity hover:opacity-100"
              target="_blank"
              rel="noreferrer"
            >
              <IconWorld />
            </a>
            <a
              href="https://www.instagram.com"
              className="opacity-40 transition-opacity hover:opacity-100"
              target="_blank"
              rel="noreferrer"
            >
              <IconCamera />
            </a>
            <a
              href="mailto:support@theoriginote.com"
              className="opacity-40 transition-opacity hover:opacity-100"
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

export default function RegistrationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Loading...</p>
        </div>
      }
    >
      <RegistrationPageContent />
    </Suspense>
  );
}
