"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  Heart,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  SunMedium,
  Truck,
} from "lucide-react";
import { StoreShell } from "@/components/store-shell";
import { useCart } from "@/hooks/use-cart";
import {
  getProductDetailHref,
  type ProductBenefitIcon,
  type ProductCatalogItem,
} from "@/lib/product-catalog";

function ProductBenefitIconNode({ icon }: { icon: ProductBenefitIcon }) {
  switch (icon) {
    case "droplets":
      return <Droplets className="h-5 w-5" />;
    case "shield":
      return <ShieldCheck className="h-5 w-5" />;
    case "leaf":
      return <Leaf className="h-5 w-5" />;
    case "sun":
      return <SunMedium className="h-5 w-5" />;
    case "heart":
      return <Heart className="h-5 w-5" />;
    case "sparkles":
    default:
      return <Sparkles className="h-5 w-5" />;
  }
}

export function ProductDetailPage({
  product,
  relatedProducts,
}: {
  product: ProductCatalogItem;
  relatedProducts: ProductCatalogItem[];
}) {
  const { cartIds, toggleCartItem } = useCart();
  const isSelected = cartIds.includes(product.id);

  return (
    <StoreShell>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-12 lg:pb-12 lg:pt-10">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
          <Link href="/products" className="inline-flex items-center gap-2 hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <span>/</span>
          <span>{product.category}</span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[linear-gradient(140deg,var(--accent),var(--paper))] p-6 shadow-[0_24px_60px_rgba(46,42,40,0.08)]">
              <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/50 bg-surface-strong">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-line bg-surface p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Volume
                </p>
                <p className="mt-3 text-lg font-medium">{product.volume}</p>
              </div>
              <div className="rounded-[1.5rem] border border-line bg-surface p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Finish
                </p>
                <p className="mt-3 text-lg font-medium">Light and comfortable</p>
              </div>
              <div className="rounded-[1.5rem] border border-line bg-surface p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Best For
                </p>
                <p className="mt-3 text-lg font-medium">{product.goodFor[0]}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Volume: {product.volume}
                </span>
              </div>

              <h1 className="text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
                {product.name}
              </h1>

              <p className="max-w-2xl text-lg italic text-muted">
                {product.ingredients}
              </p>

              <div className="flex items-center gap-3 text-primary">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`${product.id}-star-${index}`}
                      className="h-4 w-4 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {product.rating}
                </span>
                <span className="text-sm text-muted">({product.reviewLabel})</span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-line bg-surface p-6 shadow-[0_24px_60px_rgba(46,42,40,0.05)]">
              <p className="text-base leading-7 text-muted">{product.overview}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {product.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-[1.5rem] border border-line bg-surface-strong p-5"
                  >
                    <span className="inline-flex rounded-full bg-primary/10 p-2 text-primary">
                      <ProductBenefitIconNode icon={benefit.icon} />
                    </span>
                    <h2 className="mt-4 text-base font-medium">{benefit.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-line bg-surface-strong p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    Price
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-primary">
                    {product.price}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => toggleCartItem(product.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.24em] transition ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "bg-primary text-background hover:bg-foreground"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <Link
                    href="/skin-type"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.24em] transition hover:border-primary hover:text-primary"
                  >
                    Start Routine Plan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Simple delivery promise</p>
                    <p className="text-sm leading-6 text-muted">
                      Free shipping for orders above RM 80.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Made for daily use</p>
                    <p className="text-sm leading-6 text-muted">
                      Easy to layer with a simple morning or evening routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-12 lg:pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="rounded-[2rem] border border-line bg-surface p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              About This Product
            </p>
            <div className="mt-6 space-y-4">
              {product.details.map((detail) => (
                <p key={detail} className="text-sm leading-7 text-muted">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              How To Use
            </p>
            <ol className="mt-6 space-y-4">
              {product.howToUse.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Good For
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.goodFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-surface-strong px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] ring-1 ring-line"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              More to Explore
            </p>
            <h2 className="mt-3 text-3xl tracking-[-0.04em] sm:text-4xl">
              You may also like
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <article key={item.id} className="group space-y-4">
              <Link
                href={getProductDetailHref(item.id)}
                className="relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-accent"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 90vw, 25vw"
                />
              </Link>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {item.description}
                </p>
                <p className="text-sm font-bold text-primary">{item.price}</p>
              </div>
              <Link
                href={getProductDetailHref(item.id)}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary"
              >
                Detail of Product
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </StoreShell>
  );
}
