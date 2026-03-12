"use client";

import { useSyncExternalStore } from "react";
import { getSelectedProducts } from "@/lib/product-catalog";

const CART_STORAGE_KEY = "the-originote-cart";
const EMPTY_CART: string[] = [];

let cartSnapshot: string[] = [];
let hasLoadedSnapshot = false;

const cartListeners = new Set<() => void>();

function sanitizeCartIds(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(value.filter((item): item is string => typeof item === "string")),
  );
}

function readCartFromStorage(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    return sanitizeCartIds(JSON.parse(rawValue));
  } catch {
    return [];
  }
}

function ensureCartSnapshot() {
  if (hasLoadedSnapshot || typeof window === "undefined") {
    return;
  }

  cartSnapshot = readCartFromStorage();
  hasLoadedSnapshot = true;
}

function emitCartChange() {
  for (const listener of cartListeners) {
    listener();
  }
}

function writeCartSnapshot(nextIds: string[]) {
  cartSnapshot = sanitizeCartIds(nextIds);
  hasLoadedSnapshot = true;

  if (typeof window !== "undefined") {
    if (cartSnapshot.length > 0) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartSnapshot));
    } else {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }

  emitCartChange();
}

function getCartSnapshot() {
  ensureCartSnapshot();
  return cartSnapshot;
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      cartListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== CART_STORAGE_KEY) {
      return;
    }

    cartSnapshot = readCartFromStorage();
    hasLoadedSnapshot = true;
    emitCartChange();
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    cartListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useCart() {
  const cartIds = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => EMPTY_CART,
  );
  const selectedProducts = getSelectedProducts(cartIds);

  function toggleCartItem(productId: string) {
    const currentIds = getCartSnapshot();
    const nextIds = currentIds.includes(productId)
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId];

    writeCartSnapshot(nextIds);
  }

  function clearCart() {
    writeCartSnapshot([]);
  }

  return {
    cartIds,
    selectedProducts,
    toggleCartItem,
    clearCart,
  };
}
