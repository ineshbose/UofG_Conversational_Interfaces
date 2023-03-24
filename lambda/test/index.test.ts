import { expect, it, describe } from "vitest";
import {} from "../src";
import { name as pkgName } from "../package.json";

describe(pkgName, () => {
  it.todo("pass", () => {
    expect(true).toBe(true);
  });
});
