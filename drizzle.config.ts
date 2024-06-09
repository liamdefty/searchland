import { type Config } from "drizzle-kit";

import { env } from "@searchland/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["searchland_*"],
} satisfies Config;
