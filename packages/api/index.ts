import { ofetch } from "ofetch";

const DEFAULT_URL = "https://v3.football.api-sports.io/";
// type Options = CreateFetchOptions["defaults"] & {
//   baseURL?:
//     | "https://api-football-v1.p.rapidapi.com/v3/" // rapidapi
//     | "https://v3.football.api-sports.io/"; // api-sports
// };

const apiFetch = ofetch.create({ baseURL: DEFAULT_URL });

export default apiFetch;
