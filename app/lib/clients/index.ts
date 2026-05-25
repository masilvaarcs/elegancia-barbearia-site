import type { ClientProfileInput } from "../client-types";
import { eleganciaProfileInput } from "./elegancia";

export const defaultClientId = "elegancia";

export const clientProfiles: Record<string, ClientProfileInput> = {
  elegancia: eleganciaProfileInput,
};

export function resolveClientId(rawClientId: string | undefined) {
  const normalized = (rawClientId ?? "").trim().toLowerCase();

  if (!normalized) {
    return defaultClientId;
  }

  if (normalized in clientProfiles) {
    return normalized;
  }

  return defaultClientId;
}

export function getAvailableClientIds() {
  return Object.keys(clientProfiles).sort();
}

