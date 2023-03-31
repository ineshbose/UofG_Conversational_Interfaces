import type { RequestEnvelope } from "ask-sdk-model";
import { getResolvedSlot } from "../../../packages/lambda/src/utils";
import jsonData from "./dlg-fae71afc-cd70-4ece-a3e1-73d8b1f381f3.json";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

console.log(
  JSON.stringify(
    jsonData.map((requestEnvelope) => {
      if (!requestEnvelope.request) {
        return {};
      }

      const { version, session, request } = requestEnvelope;
      const toReturn: RecursivePartial<
        RequestEnvelope | (typeof jsonData)[number]
      > = {
        version,
        session: { attributes: session?.attributes || {} },
        context: {},
        request: {},
      };

      const { type, locale, timestamp, intent } = request || {};
      toReturn.request = { type, locale, timestamp, intent: {} };
      toReturn.request.intent = { name: intent?.name, slots: {} };

      const team =
        getResolvedSlot(
          requestEnvelope as unknown as RequestEnvelope,
          "team"
        ).pop() || session?.attributes.current_team;

      const info = getResolvedSlot(
        requestEnvelope as unknown as RequestEnvelope,
        "info"
      ).map((i) => i.id) as any;

      toReturn.request.intent.slots = { team, info };
      return toReturn;
    })
  )
);
