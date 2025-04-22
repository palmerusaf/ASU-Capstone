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
import { addResume } from "@/utils/db/localStorage";
import { ResumeSchema } from "@/utils/db/schema";

export function ResumeForm() {
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
        profiles: [{ network: "", username: "", url: "" }],
      },
      education: [{
        institution: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: ""
      }],
      work: [{
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        summary: ""
      }],
      projects: [{
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        url: ""
      }]
    }
  });

// Fields below can be adjusted to make room for adding more (would add 'append')
  const { fields: educationFields } = useFieldArray({ control: form.control, name: "education" });
  const { fields: workFields } = useFieldArray({ control: form.control, name: "work" });
  const { fields: projectFields } = useFieldArray({ control: form.control, name: "projects" });
  const { fields: profileFields, append: appendProfile, remove: removeProfile } = useFieldArray({
    control: form.control,
    name: "basics.profiles"
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
                <FormField control={form.control} name="basics.name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="basics.label" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="basics.email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="basics.phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="basics.website" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="md:col-span-2">
                  <FormField control={form.control} name="basics.summary" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Social Profiles</h2>
              {profileFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name={`basics.profiles.${index}.network`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Network</FormLabel>
                        <FormControl><Input placeholder="e.g. LinkedIn" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`basics.profiles.${index}.username`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input placeholder="e.g. edinramovic" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`basics.profiles.${index}.url`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile URL</FormLabel>
                        <FormControl><Input placeholder="https://linkedin.com/in/edinramovic" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeProfile(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendProfile({ network: "", username: "", url: "" })}>
                Add Profile
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Education</h2>
              {educationFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`education.${index}.area`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`education.${index}.studyType`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Type</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`education.${index}.startDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`education.${index}.endDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-8 overflow-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Work Experience</h2>
              {workFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name={`work.${index}.company`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`work.${index}.position`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`work.${index}.startDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`work.${index}.endDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name={`work.${index}.summary`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Projects</h2>
              {projectFields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`projects.${index}.url`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`projects.${index}.startDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`projects.${index}.endDate`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl><Input placeholder="YYYY-MM-DD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-8 block mx-auto">Save</Button>
      </form>
    </Form>
  );
}

export function ResumeUpload() {
  return <div className="w-full"><ResumeForm /></div>;
}