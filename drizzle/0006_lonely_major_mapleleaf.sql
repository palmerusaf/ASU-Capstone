CREATE TABLE "applied_jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applied_jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"job_id" integer NOT NULL,
	"date_applied" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applied_jobs_job_id_unique" UNIQUE("job_id")
);
--> statement-breakpoint
DROP TABLE "job_events" CASCADE;--> statement-breakpoint
ALTER TABLE "applied_jobs" ADD CONSTRAINT "applied_jobs_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;