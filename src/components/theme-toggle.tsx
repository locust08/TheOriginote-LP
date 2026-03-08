"use client";

import { useSyncExternalStore } from "react";

type ThemeMode = "system" | "light" | "dark";

const themeModes: ThemeMode[] = ["system", "light", "dark"];
const themeModeSubscribers = new Set<() => void>();

function getSavedThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const savedTheme = localStorage.getItem("theme-mode");
  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : "system";
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;

  if (mode === "system") {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme-mode");
    return;
  }

  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme-mode", mode);
}

function subscribeToThemeMode(listener: () => void) {
  themeModeSubscribers.add(listener);
  return () => {
    themeModeSubscribers.delete(listener);
  };
}

function notifyThemeModeSubscribers() {
  for (const listener of themeModeSubscribers) {
    listener();
  }
}

export function ThemeToggle() {
  const themeMode = useSyncExternalStore<ThemeMode>(
    subscribeToThemeMode,
    getSavedThemeMode,
    () => "system",
  );

  function cycleTheme() {
    const nextMode = themeModes[(themeModes.indexOf(themeMode) + 1) % themeModes.length];
    applyTheme(nextMode);
    notifyThemeModeSubscribers();
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex min-w-[92px] items-center justify-center rounded-full border border-line bg-surface px-3 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground transition hover:bg-foreground hover:text-background sm:min-w-[108px] sm:text-xs sm:tracking-[0.3em]"
      aria-label={`Theme mode: ${themeMode}. Click to change theme.`}
    >
      {themeMode}
    </button>
  );
}
