import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Define the Zod schema, including an education array
const ResumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    label: z.string().min(1, { message: "Professional title is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    website: z.string().url({ message: "Invalid website URL" }).optional(),
    summary: z.string().optional(),
  }),
  education: z.array(
    z.object({
      institution: z.string().min(1, { message: "Institution is required" }),
      degree: z.string().min(1, { message: "Degree is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string().optional(),
    })
  ),
});

export function ResumeForm() {
  const form = useForm<z.infer<typeof ResumeSchema>>({
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
      // Provide two education entries by default
      education: [
        { institution: "", degree: "", startDate: "", endDate: "" },
        { institution: "", degree: "", startDate: "", endDate: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  function onSubmit(data: z.infer<typeof ResumeSchema>) {
    toast.success("Resume Data Submitted");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">Basics</h2>

        <FormField
          control={form.control}
          name="basics.name"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...(field as any)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ...other basics fields... */}

        <h2 className="text-xl font-bold mt-8">Education</h2>
        {fields.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-md space-y-4">
            <FormField
              control={form.control}
              name={`education.${index}.institution`}
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Institution Name" {...(field as any)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.degree`}
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Degree" {...(field as any)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.startDate`}
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.endDate`}
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...(field as any)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="destructive" onClick={() => remove(index)}>
              Remove Education
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            append({ institution: "", degree: "", startDate: "", endDate: "" })
          }
        >
          Add Education
        </Button>

        <Button type="submit">Submit Resume</Button>
      </form>
    </Form>
  );
}

export function ResumeUpload() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ResumeForm />
    </div>
  );
}