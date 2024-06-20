import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email should be valid" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code:z.optional(z.string())
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email should be valid" }),
  password: z.string().min(6, {
    message: "Password min length is 6",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});


export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
   
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password min length is 6",
  }),
});