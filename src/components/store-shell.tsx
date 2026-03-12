"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Instagram,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";

type StoreShellProps = {
  children: ReactNode;
  isSearchOpen?: boolean;
  onSearchToggle?: () => void;
  searchPanel?: ReactNode;
};

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Skin Type", href: "/skin-type" },
  { label: "Register", href: "/registration" },
];

export function StoreShell({
  children,
  isSearchOpen = false,
  onSearchToggle,
  searchPanel,
}: StoreShellProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { selectedProducts, toggleCartItem, clearCart } = useCart();

  const registrationHref =
    selectedProducts.length > 0
      ? `/registration?items=${selectedProducts.map((item) => item.id).join(",")}`
      : "/registration";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-background/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-12">
        <div className="relative">
          <button
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-xs"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>

          {isMenuOpen ? (
            <div className="absolute left-0 top-11 w-52 rounded-2xl border border-line bg-surface-strong p-3 shadow-2xl">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-muted">
                Pages
              </p>
              <div className="space-y-1">
                {pages.map((page) => {
                  const isActive = pathname === page.href;

                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block rounded-xl px-3 py-2 text-sm transition ${
                        isActive
                          ? "bg-accent text-primary"
                          : "hover:bg-accent hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {page.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <Link
          href="/"
          className="text-center text-sm font-medium tracking-[0.24em] sm:text-xl sm:tracking-[0.2em]"
        >
          THE ORIGINOTE
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {onSearchToggle ? (
            <>
              <button
                className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background lg:flex"
                type="button"
                onClick={onSearchToggle}
              >
                Search
                <Search className="h-4 w-4" />
              </button>

              <button
                className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background lg:hidden"
                type="button"
                onClick={onSearchToggle}
                aria-label="Open search"
              >
                <Search className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/products"
                className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background lg:flex"
              >
                Browse
                <Search className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background lg:hidden"
                aria-label="Browse products"
              >
                <Search className="h-4 w-4" />
              </Link>
            </>
          )}

          <Link
            href={registrationHref}
            className="rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
            aria-label="Profile and registration"
          >
            <UserRound className="h-5 w-5" />
          </Link>

          <button
            className="relative rounded-full border border-line p-2 transition hover:bg-foreground hover:text-background"
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-background">
              {selectedProducts.length}
            </span>
          </button>
        </div>
      </nav>

      {isSearchOpen ? searchPanel : null}

      <main>{children}</main>

      <footer className="border-t border-line bg-accent/85 px-4 py-12 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl tracking-[0.2em] text-muted">THE ORIGINOTE</h2>
            <p className="text-xs text-muted">
              Simple skincare made for everyday routines.
            </p>
          </div>

          <div className="flex gap-10 text-[10px] uppercase tracking-widest text-muted">
            <Link href="/about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/products" className="transition-colors hover:text-primary">
              Products
            </Link>
            <Link
              href="/registration"
              className="transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.theoriginote.com"
              className="rounded-full border border-line p-2 text-muted transition hover:border-primary hover:text-primary"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit The Originote"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/theoriginote"
              className="rounded-full border border-line p-2 text-muted transition hover:border-primary hover:text-primary"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="mailto:support@theoriginote.com"
              className="rounded-full border border-line p-2 text-muted transition hover:border-primary hover:text-primary"
              aria-label="Email support"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-line pt-8 text-center">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            © 2026 The Originote. All rights reserved.
          </span>
        </div>
      </footer>

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
                <X className="h-4 w-4" />
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <p className="text-sm text-muted">
                Your cart is empty. Add products before proceeding to registration.
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
                      <X className="h-4 w-4" />
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
