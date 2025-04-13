import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import resumeSchema from "@jsonresume/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addResume } from '@/utils/db/localStorage.ts';
import { ResumeSchema } from '@/utils/db/schema.ts';

export function ResumeForm() { // Set default input values to empty
  const form = useForm<z.infer<typeof ResumeSchema>>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      basics: {
        name: "",
        label: "",
        email: "",
        phone: "",
        website: "",
        summary: "",
      },
      education: [{ institution: "", degree: "", startDate: "", endDate: "" }],
      work: [{ name: "", position: "", startDate: "", endDate: "", summary: "" }],
      projects: [{ name: "", startDate: "", endDate: "", description: "", url: "" }],
    },
  });

// Fields below can be adjusted to make room for adding more (would add 'append')
  const { fields: educationFields } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const { fields: workFields } = useFieldArray({
    control: form.control,
    name: "work",
  });
  const { fields: projectFields } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  function onSubmit(data: z.infer<typeof ResumeSchema>) {
    // Use resumeSchema to validate object before saving
    resumeSchema.validate(
      data,
      async (err, report) => {
        if (err) {
          toast.error("Resume is invalid.");
          return;
        }

        try {
          await addResume(data); // Saves to 'local:resumes'
          toast.success("Resume saved successfully!");
        } catch (e) {
          console.error("Error saving resume:", e);
          toast.error("Failed to save resume.");
        }
      },
      () => {
        toast.error("Resume validation failed.");
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-8 overflow-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="basics.name"
                  render={({ field, formState }): React.ReactElement => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...(field as any)} />
                      </FormControl>
                      {formState.isSubmitted && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basics.label"
                  render={({ field, formState }): React.ReactElement => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Developer" {...(field as any)} />
                      </FormControl>
                      {formState.isSubmitted && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basics.email"
                  render={({ field, formState }): React.ReactElement => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...(field as any)} />
                      </FormControl>
                      {formState.isSubmitted && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basics.phone"
                  render={({ field, formState }): React.ReactElement => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+123456789" {...(field as any)} />
                      </FormControl>
                      {formState.isSubmitted && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basics.website"
                  render={({ field, formState }): React.ReactElement => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...(field as any)} />
                      </FormControl>
                      {formState.isSubmitted && <FormMessage />}
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="basics.summary"
                    render={({ field, formState }): React.ReactElement => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Input placeholder="A brief summary about yourself" {...(field as any)} />
                        </FormControl>
                        {formState.isSubmitted && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Education</h2>
              {educationFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Institution Name" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Degree" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.startDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.endDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-8 overflow-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Experience</h2>
              {workFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`work.${index}.name`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`work.${index}.position`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Position" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`work.${index}.startDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`work.${index}.endDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`work.${index}.summary`}
                    render={({ field, formState }): React.ReactElement => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Input placeholder="Summary of your role" {...(field as any)} />
                        </FormControl>
                        {formState.isSubmitted && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              {projectFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`projects.${index}.name`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Name" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.url`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Project URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://projecturl.com" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.startDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`projects.${index}.endDate`}
                      render={({ field, formState }): React.ReactElement => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                          </FormControl>
                          {formState.isSubmitted && <FormMessage />}
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    render={({ field, formState }): React.ReactElement => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Description" {...(field as any)} />
                        </FormControl>
                        {formState.isSubmitted && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-8 block mx-auto">
          Save
        </Button>
      </form>
    </Form>
  );
}

export function ResumeUpload() {
  return (
    <div className="w-full">
      <ResumeForm />
    </div>
  );
}