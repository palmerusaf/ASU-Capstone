export const createTbleSqlRaw = `
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"close_out_date" timestamp NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"company_logo_url" text DEFAULT '',
	"company_name" text NOT NULL,
	"description" text NOT NULL,
	"easy_apply" boolean NOT NULL,
	"remote" boolean DEFAULT false NOT NULL,
	"job_id" integer NOT NULL,
	"job_site" text NOT NULL,
	"position_title" text NOT NULL,
	"location" text NOT NULL,
	"post_link" text NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testSchema" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testSchema_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"test_field" text NOT NULL
);

`;
