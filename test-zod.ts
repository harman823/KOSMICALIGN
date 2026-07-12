import { z } from 'zod';
const schema = z.object({
  D: z.coerce.number().optional().default(60)
});
const result = schema.safeParse({});
console.log(JSON.stringify(result, null, 2));
