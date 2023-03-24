import type { RequestHandler, ErrorHandler } from "ask-sdk-core";

export const defineRequestHandler = <T extends RequestHandler>(intent: T) =>
  intent;

export const defineErrorHandler = <T extends ErrorHandler>(intent: T) =>
  intent;
