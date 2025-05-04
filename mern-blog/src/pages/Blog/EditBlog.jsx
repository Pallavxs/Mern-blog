import { React, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import { useState } from "react";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouterName";
import { decode } from 'entities'
import Loading from "@/components/Loading";

function EditBlog() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const { blogid } = useParams()
    const {data: categoryData} = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
      method: "get",
      credentials: "include",
    });

    const {data: blogData, loading: blogLoading} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`, {
      method: "get",
      credentials: "include",
    },[blogid]);
    
  const [file, setFile] = useState()
  const [filePreview, setFilePreview] = useState()

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 character long"),
    title: z.string().min(3, "Title must be at least 3 character long"),
    slug: z.string().min(3, "Slug must be at least 3 character long"),
    blogContent: z.string().min(3, "Blog content must be at least 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  useEffect(() => {
    if(blogData){
      setFilePreview(blogData.blog.featuredImage)
      form.setValue('category',blogData.blog.category._id)
      form.setValue('title',blogData.blog.title)
      form.setValue('slug',blogData.blog.slug)
      form.setValue('blogContent',decode(blogData.blog.blogContent))
    }
  },[blogData])

  const handleEditorData = (event, editor) => {
    const data = editor.getData()
    form.setValue('blogContent' ,data)
  }

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);
  
  async function onSubmit(values) {
     try { 
          const formData = new FormData()
          formData.append('file', file)
          formData.append('data',JSON.stringify(values))
          
          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid}`,{
              method: "put",
              credentials: "include",
              body: formData
            });
          console.log(response)
          const data = await response.json();
          if (!response.ok) {
            return showToast("error", data.message || "Something went wrong");
          }
          form.reset()
          setFile()
          setFilePreview()
          navigate(RouteBlog)
          showToast("success", data.message);
        } catch (error) {
          showToast("error", error.message || "Something went wrong");
        }
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setFilePreview(preview)
  }   

  if(blogLoading) return <Loading/>

  return (
    <div className="pt-5">
      <Card>
        <CardContent>
          <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3 ">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value} onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.category.length > 0 &&
                              categoryData.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3 ">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="enter your blog title" {...field} />
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

              <div className="mb-3 ">
                <span className='mb-2'>Featured Images</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-28 border-dashed border-2 rounded">
                        <img src={filePreview}/>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className='mb-3'>
              <FormField
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                      <Editor props={{initialData: field.value, onChange: handleEditorData}}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditBlog;
