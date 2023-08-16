import { boolean, text, timestamp, uuid, pgTable } from "drizzle-orm/pg-core";
import { userTable } from "../auth/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const todoTable = pgTable('todos', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id').notNull().references(() => userTable.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	title: text('title').notNull(),
	completed: boolean('completed').notNull().default(false),

});

export const todoSelectSchema = createSelectSchema(todoTable);
export const todoInsertSchema = createInsertSchema(todoTable);

export type Todo = z.infer<typeof todoSelectSchema>;
