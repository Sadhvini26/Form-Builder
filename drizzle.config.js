import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_ArMSzFI5i2gj@ep-falling-forest-a1toekp5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  }
});
