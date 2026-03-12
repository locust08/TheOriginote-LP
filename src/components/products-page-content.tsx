"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ShoppingBag } from "lucide-react";
import { StoreShell } from "@/components/store-shell";
import { useCart } from "@/hooks/use-cart";
import {
  getProductDetailHref,
  productCatalog,
  type ProductCatalogItem,
} from "@/lib/product-catalog";

const categories = [
  "All Products",
  "Moisturizers",
  "Serums & Essence",
  "Cleansers",
  "Sun Protection",
  "Masks & Eye Care",
];

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
      <Link
        href={getProductDetailHref(product.id)}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-accent"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 46vw, 30vw"
        />
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
      </Link>

      <div className="space-y-1">
        <h3 className="text-lg font-medium">
          <Link
            href={getProductDetailHref(product.id)}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
          {product.description}
        </p>
        <p className="text-sm text-muted">{product.overview}</p>
        <p className="pt-1 text-sm font-bold text-primary">{product.price}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
            isSelected
              ? "bg-foreground text-background"
              : "border border-line bg-surface-strong hover:border-primary hover:text-primary"
          }`}
          type="button"
          onClick={() => onToggleSelect(product.id)}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>

        <Link
          href={getProductDetailHref(product.id)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-foreground"
        >
          Detail of Product
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function ProductsPageContent({ initialQuery }: { initialQuery: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(initialQuery));
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const { cartIds, toggleCartItem } = useCart();

  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearch = deferredSearchTerm.trim().toLowerCase();

  const filteredProducts = productCatalog.filter((product) => {
    if (!normalizedSearch) {
      return true;
    }

    const haystack =
      `${product.name} ${product.description} ${product.subtitle} ${product.overview} ${product.category}`.toLowerCase();
    return haystack.includes(normalizedSearch);
  });

  return (
    <StoreShell
      isSearchOpen={isSearchOpen}
      onSearchToggle={() => setIsSearchOpen((prev) => !prev)}
      searchPanel={
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
              placeholder="Search products by name, category, or skin need..."
              className="w-full rounded-full border border-line bg-surface-strong px-5 py-3 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </div>
        </div>
      }
    >
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
            Discover gentle skincare with clear benefits, easy routines, and
            product details written in simple English.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              className="rounded-full bg-foreground px-10 py-4 text-xs font-semibold uppercase tracking-widest text-background transition hover:bg-primary"
              type="button"
              onClick={() => setIsSearchOpen(true)}
            >
              Explore Collection
            </button>
            <Link
              href="/skin-type"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-8 py-4 text-xs font-semibold uppercase tracking-widest transition hover:border-primary hover:text-primary"
            >
              Start Routine Plan
              <ArrowRight className="h-4 w-4" />
            </Link>
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
              Popular Pick
            </p>
            <p className="text-sm font-medium">The Originote Hyalucera Moisturizer</p>
            <p className="mt-1 text-xs font-semibold text-primary">
              Soft finish, easy daily hydration
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-4 lg:hidden">
              {["All", "Moisturizer", "Serums", "Cleansers"].map((item, idx) => (
                <button
                  key={item}
                  className={`whitespace-nowrap rounded-full px-6 py-2 text-xs uppercase tracking-widest ${
                    idx === 0 ? "bg-foreground text-background" : "border border-line"
                  }`}
                  type="button"
                >
                  {item}
                </button>
              ))}
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
            <div className="mb-10 flex items-center justify-between gap-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Showing {filteredProducts.length} Products
              </p>
              <button
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                type="button"
                onClick={() => setIsSearchOpen((prev) => !prev)}
              >
                Search / Sort
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-line bg-surface p-10 text-center">
                <p className="text-sm text-muted">
                  No products found for &quot;{deferredSearchTerm}&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
    </StoreShell>
  );
}
