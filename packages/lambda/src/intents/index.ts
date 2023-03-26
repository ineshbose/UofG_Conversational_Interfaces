import LaunchRequestHandler from "./launch";
import GetInfoIntentHandler from "./get-info";
import HelpIntentHandler from "./help";
import CancelAndStopIntentHandler from "./cancel";
import FallbackIntentHandler from "./fallback";
import SessionEndedRequestHandler from "./session-end";
import IntentReflectorHandler from "./reflector";

import ErrorHandler from "./error";

export const requestHandlers = [
  LaunchRequestHandler,
  GetInfoIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
];

export const errorHandlers = [ErrorHandler];
