import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/helpers/showToast";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { getEnv } from "@/helpers/getEnv.js";
import Loading from "@/components/Loading";
import usericon from "@/assets/images/user.png";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from 'react-dropzone';
import { setUser } from "@/redux/user/user.slice";

function Profile() {
  const user = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const API_BASE_URL = getEnv("VITE_API_BASE_URL");

  const { data: userData, loading, error } = useFetch(
    `${API_BASE_URL}/user/get-user/${user?.user?._id}`, 
    {
      method: "get",
      credentials: "include"
    }
  );

  const dispatch = useDispatch();
  
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.string().email("Invalid email address"),
    bio: z.string().min(3, "Bio must be at least 3 characters long."),
    password: z.string().optional()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name || "",
        email: userData.user.email || "",
        bio: userData.user.bio || "",
        password: "",
      });
    }
  }, [userData, form]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      formData.append('data', JSON.stringify(values));
      
      const response = await fetch(
        `${API_BASE_URL}/user/update-user/${userData.user._id}`,
        {
          method: "put",
          credentials: "include",
          body: formData
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        return showToast("error", data.message || "Something went wrong");
      }
      
      showToast("success", data.message);
      dispatch(setUser(data.user));
    } catch (error) {
      showToast("error", error.message || "Something went wrong");
    } 
  }

  const handleFileSelection = (files) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const preview = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFilePreview(preview);
    }
  };   

  if (loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone onDrop={handleFileSelection}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group">
                  <AvatarImage 
                    src={filePreview || userData?.user?.avatar || usericon} 
                    alt="User avatar"
                  />
                  <AvatarFallback>{userData?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                    <IoCameraOutline color="#7c3aed" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input autoComplete="name" placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter bio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;