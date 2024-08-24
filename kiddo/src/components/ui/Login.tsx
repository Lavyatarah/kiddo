"use client"

import React from 'react'
import { Button } from './button'
import { Input } from './input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from './form'
import {z} from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    password: z.string().min(2, {
      message: "Password is required.",
    }),
  });
const Login = () => {
    // const form = useForm()

const LoginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
   
  };
  return (
    <div>
      <h2>      Login here
      </h2>

      <Form {...LoginForm}>
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>                                                                                                                                                                                                                                                                                                                                                              
              <CardDescription>
                Enter your email and password to access your Manivas Account
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={LoginForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <CardContent className="space-y-4">
                <FormField
                  control={LoginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="abc@example.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={LoginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="flex w-full justify-end">
                        <Button
                          className="p-0 m-0"
                          type="button"
                          variant="link"
                        >
                          Forgot Password ?
                        </Button>
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-5">
                  
                    Sign In
                </Button>
                <div className="mt-5 space-y-5">
                  <center className="flex items-center gap-2.5">
                    <hr className="w-full" />
                    <strong className="text-slate-400 text-sm text-center">
                      or
                    </strong>
                    <hr className="w-full" />
                  </center>

                  
         
                <p className="font-bold text-slate-500 text-sm text-center">
                  Don't have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 font-bold"
                    
                  >
                    {" "}
                    Sign Up
                  </Button>
                </p>
                </div>
              </CardContent>
            </form>
          </Card>
        </Form>
    </div>
  )
}

export default Login
