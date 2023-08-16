import { pgEnum, pgTable, pgView, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { gt, relations } from 'drizzle-orm';
import {createInsertSchema, createSelectSchema} from 'drizzle-zod';

export const userRole = pgEnum('user_role', ['user', 'admin']);

export const userTable = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').unique().notNull(),
	fname: text('fname').notNull().default(''),
	lname: text('lname').notNull().default(''),
	password: text('password').notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	role: userRole('role').notNull().default('user'),
});

export const userInsertSchema = createInsertSchema(userTable);
export const userSelectSchema = createSelectSchema(userTable);

export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
}))

export const sessionTable = pgTable('user_sessions', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id').notNull().references(() => userTable.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	expiresAt: timestamp("expires_at").notNull().defaultNow(),
});

export const sessionInsertSchema = createInsertSchema(sessionTable);
export const sessionSelectSchema = createSelectSchema(sessionTable);

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}));

export const passwordResetTable = pgTable('password_resets', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id').notNull().references(() => userTable.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	expiresAt: timestamp("expires_at").notNull().defaultNow(),
});

export const passwordResetInsertSchema = createInsertSchema(passwordResetTable);
export const passwordResetSelectSchema = createSelectSchema(passwordResetTable);
