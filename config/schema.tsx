import { integer, text, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer(),
});

export const SessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar({ length: 255 }).notNull(),
  notes: text(),
  selectedDoctor:json(),
  conversation: json(),
  report: json(),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn: varchar({ length: 255 }),
});
