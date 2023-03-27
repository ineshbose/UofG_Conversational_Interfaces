import { ofetch, type FetchOptions } from "ofetch";
import type { EndpointMap } from "./types";

const DEFAULT_URL = "https://v3.football.api-sports.io/";
export const apiFetch = ofetch.create({ baseURL: DEFAULT_URL });

export default function interact<
  E extends keyof EndpointMap,
  R extends EndpointMap[E],
  P extends R["parameters"]
>(endpoint: E, params: P, options: FetchOptions<"json"> = {}) {
  return apiFetch<R>(endpoint, { ...options, params });
}
