/**
 * Would be great to implement zod schemas for the responses..
 * but I don't have enough time to get to it yet.
 */
import { z } from "zod";

const getBaseSchema = <
  R extends z.ZodTypeAny,
  P extends Record<string, z.ZodTypeAny>
>(
  response: R,
  params: P
) =>
  z.object({
    get: z.string(),
    parameters: z.object(params),
    errors: z.array(z.unknown()),
    results: z.number(),
    paging: z.object({ current: z.number(), total: z.number() }),
    response,
  });

export const getSchemaWithTeam = <
  R extends z.ZodTypeAny,
  P extends Record<string, z.ZodTypeAny>
>(
  response: R,
  params: P = <P>{}
) => getBaseSchema(response, { team: z.string(), ...params });
