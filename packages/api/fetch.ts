import { ofetch, type FetchOptions } from "ofetch";
import destr from "destr";
import type { EndpointMap } from "./types";

const DEFAULT_URL = "https://v3.football.api-sports.io/";
const cache: Partial<Record<keyof EndpointMap, Record<string, any>>> = {};

export const apiFetch = ofetch.create({
  baseURL: DEFAULT_URL,
  headers: { "x-rapidapi-host": "v3.football.api-sports.io" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    // console.log(`Requesting ${request}`);
  },
});

export function interact<
  E extends keyof EndpointMap,
  R extends EndpointMap[E],
  P extends R["parameters"]
>(endpoint: E, params: P, options: FetchOptions<"json"> = {}) {
  const cacheKey = JSON.stringify(params);
  if (cache[endpoint]?.[cacheKey]) {
    return destr(cache[endpoint]?.[cacheKey]) as R;
  }

  return apiFetch<R>(endpoint, { ...options, params }).then((d) => {
    cache[endpoint] = cache[endpoint] || {};
    // @ts-ignore
    cache[endpoint][cacheKey] = JSON.stringify(d); // safe copy
    return d;
  });
}
