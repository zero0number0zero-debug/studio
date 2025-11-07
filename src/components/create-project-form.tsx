"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Sparkles } from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateProjectName } from "@/ai/flows/generate-project-name";
import { useToast } from "@/hooks/use-toast";
import { createProject } from "@/lib/projects-service";

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;

export function CreateProjectForm() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleGenerateName = async () => {
    const description = form.getValues("description");
    if (!description || description.length < 10) {
      form.setError("description", {
        type: "manual",
        message: "Please enter a description of at least 10 characters to generate a name.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateProjectName({ projectDescription: description });
      form.setValue("name", result.projectName, { shouldValidate: true });
    } catch (error) {
      console.error("Failed to generate project name:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate project name. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsCreating(true);
    try {
      await createProject(data.name, data.description);
      toast({
        title: "Project Created!",
        description: `The project "${data.name}" has been successfully created.`,
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
       console.error("Failed to create project:", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again.",
      });
    } finally {
       setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-4">
                  <FormLabel className="text-right pt-2">Description</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-4">
                  <FormLabel className="text-right pt-2">Name</FormLabel>
                  <div className="col-span-3">
                    <div className="flex gap-2">
                       <FormControl>
                        <Input {...field} disabled={isGenerating || isCreating} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleGenerateName}
                        disabled={isGenerating || isCreating}
                        aria-label="Generate project name"
                      >
                        <Sparkles className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                      </Button>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
