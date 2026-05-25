"use client";

import { useEffect, useState } from "react";

const VISITOR_NAME_STORAGE_KEY = "elegancia.visitorName";

export function useVisitorName() {
  const [name, setName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem(VISITOR_NAME_STORAGE_KEY) ?? "";
      setName(savedName);
    } catch {
      // Fallback silencioso
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      const trimmedName = name.trim();
      if (trimmedName) {
        window.localStorage.setItem(VISITOR_NAME_STORAGE_KEY, trimmedName);
      } else {
        window.localStorage.removeItem(VISITOR_NAME_STORAGE_KEY);
      }
    } catch {
      // Fallback silencioso
    }
  }, [hydrated, name]);

  return [name, setName] as const;
}

export function getVisitorNameStorageKey() {
  return VISITOR_NAME_STORAGE_KEY;
}
