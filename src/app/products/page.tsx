"use client";

import { startTransition, useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  getSelectedProducts,
  productCatalog,
  type ProductCatalogItem,
} from "@/lib/product-catalog";

type NavPage = {
  label: string;
  href: string;
};

const categories = [
  "All Products",
  "Moisturizers",
  "Serums & Essence",
  "Cleansers",
  "Sun Protection",
  "Masks & Eye Care",
];

const pages: NavPage[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Register", href: "/registration" },
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

function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" />
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

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19c1.4-3 4-4.5 7-4.5s5.6 1.5 7 4.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ProductCard({
  product,
  isSelected,
  onToggleSelect,
}: {
  product: ProductCatalogItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  return (
    <article className="group space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 46vw, 30vw"
        />
        <button
          className={`absolute bottom-4 right-4 rounded-full p-3 shadow-lg transition-all duration-300 ${
            isSelected
              ? "translate-y-0 bg-primary text-background opacity-100"
              : "translate-y-4 bg-surface-strong opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary hover:text-background"
          }`}
          type="button"
          onClick={() => onToggleSelect(product.id)}
          aria-label={`${isSelected ? "Remove" : "Add"} ${product.name}`}
        >
          {isSelected ? <IconClose /> : <IconPlus />}
        </button>
        {product.badge ? (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest ${
              product.badge === "Best Seller"
                ? "bg-surface-strong text-foreground"
                : "bg-primary text-background"
            }`}
          >
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium">
          <a href={product.href} className="transition-colors hover:text-primary">
            {product.name}
          </a>
        </h3>
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
          {product.description}
        </p>
        <p className="pt-1 text-sm font-bold text-primary">{product.price}</p>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartIds, setCartIds] = useState<string[]>([]);

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearch = deferredSearchTerm.trim().toLowerCase();

  const filteredProducts = productCatalog.filter((product) => {
    if (!normalizedSearch) {
      return true;
    }

    const haystack =
      `${product.name} ${product.description} ${product.subtitle}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });

  const selectedProducts = getSelectedProducts(cartIds);
  const registrationHref =
    selectedProducts.length > 0
      ? `/registration?items=${selectedProducts.map((item) => item.id).join(",")}`
      : "/registration";

  function toggleCartItem(productId: string) {
    startTransition(() => {
      setCartIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    });
  }

  function clearCart() {
    startTransition(() => setCartIds([]));
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
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

          <Link
            href={registrationHref}
            className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
            aria-label="Profile and registration"
          >
            <IconUser />
          </Link>

          <button
            className="relative rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
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
          <div className="mx-auto max-w-7xl">
            <label className="sr-only" htmlFor="product-search">
              Search products
            </label>
            <input
              id="product-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products (name, type, concern)..."
              className="w-full rounded-full border border-line bg-surface-strong px-5 py-3 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </div>
        </div>
      ) : null}

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Hydration Series
            </span>
            <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:text-7xl">
              Quench your <br />
              <span className="font-light italic">skin&apos;s thirst.</span>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted">
              Combining natural and lab ingredients into one, we aim to bring
              you pro, high-quality skincare that treats concerns safely and
              effectively.
            </p>
            <div className="pt-2">
              <button
                className="rounded-full bg-foreground px-10 py-4 text-xs font-semibold uppercase tracking-widest text-background transition hover:bg-primary"
                type="button"
                onClick={() => setIsSearchOpen(true)}
              >
                Explore Collection
              </button>
            </div>
          </div>
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent">
              <Image
                src="https://www.theoriginote.com/cdn/shop/files/id-11134207-7r98u-llbj2d069q295e_535e0a58-dc56-4c2b-a7af-5826dfb42fcc.jpg?v=1702953660&width=2048"
                alt="Hydration collection"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-2 max-w-[220px] rounded-2xl border border-line bg-surface-strong p-6 shadow-xl sm:-left-6">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-muted">
                Interesting
              </p>
              <p className="text-sm font-medium">
                The Originote Mugwort B3 Clay Stick
              </p>
              <p className="mt-1 text-xs font-semibold text-primary">Ranked #1</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
          <div className="flex flex-col gap-12 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-64">
              <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 lg:hidden">
                {["All", "Moisturizer", "Serums", "Cleansers"].map(
                  (item, idx) => (
                    <button
                      key={item}
                      className={`whitespace-nowrap rounded-full px-6 py-2 text-xs uppercase tracking-widest ${
                        idx === 0
                          ? "bg-foreground text-background"
                          : "border border-line"
                      }`}
                      type="button"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>

              <div className="sidebar-sticky hidden space-y-10 lg:block lg:sticky">
                <div>
                  <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    Categories
                  </h3>
                  <ul className="space-y-4 text-sm font-medium">
                    {categories.map((item, idx) => (
                      <li key={item}>
                        <span
                          className={`flex items-center justify-between ${
                            idx === 0 ? "text-primary" : ""
                          }`}
                        >
                          {item}
                          {idx === 0 ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-10 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                  Showing {filteredProducts.length} Products
                </p>
                <button
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                  type="button"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                >
                  Search / Sort
                  <IconChevronDown />
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-line bg-surface p-10 text-center">
                  <p className="text-sm text-muted">
                    No products found for &quot;{deferredSearchTerm}&quot;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={cartIds.includes(product.id)}
                      onToggleSelect={toggleCartItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {isCartOpen ? (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/30">
          <div className="h-full w-full max-w-md overflow-y-auto bg-surface-strong p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium uppercase tracking-[0.2em]">
                Cart
              </h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
              >
                <IconClose />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <p className="text-sm text-muted">
                Your cart is empty. Add products before proceeding to
                registration.
              </p>
            ) : (
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
                    <button
                      type="button"
                      onClick={() => toggleCartItem(product.id)}
                      className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
                      aria-label={`Remove ${product.name}`}
                    >
                      <IconClose />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-3">
              <Link
                href={registrationHref}
                className={`flex w-full items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  selectedProducts.length === 0
                    ? "pointer-events-none bg-line text-muted"
                    : "bg-primary text-background hover:bg-foreground"
                }`}
              >
                Proceed to Registration
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-full border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
