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
import Joi from "joi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}

const formSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(1000)
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(1000).required().label("Password"),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: joiResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          const { email, password } = data;

          signIn("credentials", {
            email,
            password,
            callbackUrl: "/issues",
            redirect: false,
          }).then((res) => {
            if (res?.ok) {
              toast.success("Login Success!");
              router.push("/");
            }
            if (res?.error) {
              toast.error("Invalid username or password");
            }
          });
        })}
        className="space-y-3"
      >
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

export default LoginForm;
