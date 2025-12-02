import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z
    .string()
    .default("4000")
    .transform((value) => Number(value)),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid connection string"),
  CORS_ORIGIN: z.string().optional(),
});

export const env = envSchema.parse(process.env);


