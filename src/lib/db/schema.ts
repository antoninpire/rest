import { bigint, mysqlTableCreator, varchar } from 'drizzle-orm/mysql-core';

export const mysqlTable = mysqlTableCreator((name) => `rest_${name}`);

export const user = mysqlTable('users', {
	id: varchar('id', {
		length: 15
	}).primaryKey(),
	email: varchar('email', { length: 128 }).unique()
});

export const key = mysqlTable('auth_keys', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	})
});

export const session = mysqlTable('auth_sessions', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: 15
	}).notNull(),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull(),
	email: varchar('email', { length: 128 })
});
