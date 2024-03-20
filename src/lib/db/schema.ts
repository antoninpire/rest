import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('users', {
	id: text('id', {
		length: 15
	}).primaryKey(),
	email: text('email', { length: 128 }).unique()
});

export const key = sqliteTable('auth_keys', {
	id: text('id', {
		length: 255
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	}).notNull(),
	hashedPassword: text('hashed_password', {
		length: 255
	})
});

export const session = sqliteTable('auth_sessions', {
	id: text('id', {
		length: 128
	}).primaryKey(),
	userId: text('user_id', {
		length: 15
	}).notNull(),
	activeExpires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idleExpires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull(),
	email: text('email', { length: 128 })
});
