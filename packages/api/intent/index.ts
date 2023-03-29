import linker from "./linker";
import { type InfoParam, INFO_TYPES } from "./utils";

export default async function (
  params: InfoParam,
  token: string,
  defaultResponse = "I don't know that"
) {
  const info = (
    Array.isArray(params.info)
      ? params.info
      : [params.info || "default_teamInfo"]
  ).filter((i) => INFO_TYPES.has(i));

  if (info.length === 0) {
    return defaultResponse;
  }

  return (
    await Promise.all(
      info.map((i) => linker(i, params.team, token, defaultResponse))
    )
  ).join(". ");
}
