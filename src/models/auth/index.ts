import z from "zod";

type SignInModel = z.infer<typeof signInModel>;

const signInModel = z.object({
  email: z.string().min(1, { error: "Email is required, please try again." }),
  password: z
    .string()
    .min(1, { error: "Password is required, please try again." }),
  redirectUri: z.url().catch("https://google.com"),
  siteId: z.string().catch("unknown"),
});

export type { SignInModel };
export { signInModel };
