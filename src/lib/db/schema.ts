import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    excerpt: text('excerpt'),
    author: varchar('author', { length: 100 }),
    tags: text('tags'), // JSON string array
    publishedAt: timestamp('published_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;