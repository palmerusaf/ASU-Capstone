ALTER TABLE "raw_resumes" DROP CONSTRAINT "raw_resumes_json_id_resumes_id_fk";
--> statement-breakpoint
ALTER TABLE "raw_resumes" ADD CONSTRAINT "raw_resumes_json_id_resumes_id_fk" FOREIGN KEY ("json_id") REFERENCES "public"."resumes"("id") ON DELETE cascade ON UPDATE no action;