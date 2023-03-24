import { type RequestHandler, type ErrorHandler, getSlot } from "ask-sdk-core";
import type { RequestEnvelope } from "ask-sdk-model";

export const defineRequestHandler = <T extends RequestHandler>(intent: T) =>
  intent;

export const defineErrorHandler = <T extends ErrorHandler>(intent: T) => intent;

export const getResolvedSlot = (req: RequestEnvelope, name: string) =>
  (getSlot(req, name).resolutions?.resolutionsPerAuthority || []).flatMap(
    (i) => i.values
  ).map((i) => i.value);
