CREATE TABLE IF NOT EXISTS "searchland_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone,
	CONSTRAINT "searchland_users_name_unique" UNIQUE("name")
);
