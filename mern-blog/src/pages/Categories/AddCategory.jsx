import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { showToast } from "@/helpers/showToast";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slugify from "slugify";

function AddCategory() {
  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 character long"),
      slug: z.string().min(3, "Slug must be at least 3 character long"),
    })
    

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const CategoryName = form.watch('name')

  useEffect(()=>{
    if(CategoryName){
      const slug = slugify(CategoryName, {lower: true})
      form.setValue('slug',slug)
    }
  },[CategoryName])

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/add`,
        {
          method: "post",
          credentials: 'include',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message || "Something went wrong");
      }

      showToast("success", data.message);
      form.reset()
    } catch (error) {
      showToast("error", error.message || "Something went wrong");
    }
  }

  return (
    <div className="pt-5 max-w-screen-md mx-auto"> 
      <Card>
        <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-3 ">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Slug"
                        autoComplete="slug"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <Button type="submit" className="w-full">Save</Button>

          </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCategory;
