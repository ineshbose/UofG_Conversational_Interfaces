import LaunchRequestHandler from "./launch";
import HelloWorldIntentHandler from "./hello-world";
import HelpIntentHandler from "./help";
import CancelAndStopIntentHandler from "./cancel";
import FallbackIntentHandler from "./fallback";
import SessionEndedRequestHandler from "./session-end";
import IntentReflectorHandler from "./reflector";

import ErrorHandler from "./error";

export const requestHandlers = [
  LaunchRequestHandler,
  HelloWorldIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
];

export const errorHandlers = [ErrorHandler];
