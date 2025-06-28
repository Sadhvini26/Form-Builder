import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  jsonform: text('jsonform').notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).notNull()
});
