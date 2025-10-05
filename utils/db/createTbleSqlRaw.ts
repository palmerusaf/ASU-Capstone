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
	"job_id" text,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"pay_rate" integer,
	"link" text NOT NULL,
	"status" text DEFAULT 'recently added' NOT NULL,
	CONSTRAINT "jobs_job_id_unique" UNIQUE("job_id")
);
--> statement-breakpoint
CREATE TABLE "testSchema" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "testSchema_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"test_field" text NOT NULL
);

CREATE TABLE "job_comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "job_comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"job_id" integer NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_comments" ADD CONSTRAINT "job_comments_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "jobs" ADD COLUMN "archived" boolean DEFAULT false NOT NULL;
ALTER TABLE "jobs" ADD COLUMN "pay_type" text;
`;
