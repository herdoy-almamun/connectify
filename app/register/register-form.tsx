"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { joiResolver } from "@hookform/resolvers/joi";
import { Grid } from "@radix-ui/themes";
import axios from "axios";
import Joi from "joi";
import { User } from "next-auth";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const formSchema = Joi.object({
  firstName: Joi.string().min(1).max(255).required().label("First Name"),
  lastName: Joi.string().min(1).max(255).required().label("Last Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(1000)
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(1000).required().label("Password"),
});

const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: joiResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          const { firstName, lastName, email, password } = data;
          axios
            .post<User>("/api/users", {
              name: `${firstName} ${lastName}`,
              email,
              password,
            })
            .then(() => {
              toast.success("Sign Up Success!");
              signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
              });
            })
            .catch(() => toast.error("Something went worn!"));
        })}
        className="space-y-3 w-full"
      >
        <Grid columns="1fr 1fr" gap="3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
