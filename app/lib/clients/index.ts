import type { ClientProfileInput } from "../client-types";
import { augustusProfileInput } from "./augustus";

export const defaultClientId = "augustus";

export const clientProfiles: Record<string, ClientProfileInput> = {
  augustus: augustusProfileInput,
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
