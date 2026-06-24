const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
export const BACKEND_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export const buildApiUrl = (resource: string) => `${BACKEND_HOST}/api/${resource}/`;

export function normalizeApiResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    for (const key of ['data', 'items', 'results'] as const) {
      const value = obj[key];
      if (Array.isArray(value)) {
        return value as T[];
      }
    }
  }

  return [];
}

export async function fetchApiData<T>(resource: string): Promise<T[]> {
  const response = await fetch(buildApiUrl(resource));
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return normalizeApiResponse<T>(json);
}
