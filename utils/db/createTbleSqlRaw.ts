export const createTbleSqlRaw = `
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date_posted" timestamp,
	"close_out_date" timestamp,
	"status_change_date" timestamp DEFAULT now() NOT NULL,
	"intern" boolean NOT NULL,
	"company_logo_url" text DEFAULT '',
	"employment_type" text,
	"company_name" text NOT NULL,
	"description" text NOT NULL,
	"remote" boolean NOT NULL,
	"job_id" integer NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"pay_rate" integer,
	"link" text NOT NULL,
	"status" text DEFAULT 'recently added' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testSchema" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testSchema_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"test_field" text NOT NULL
);

`;
