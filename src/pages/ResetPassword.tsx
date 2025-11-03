import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  secretKey: z.string().min(1, { message: "Enter your secret key" }),
  newPassword: z.string().min(6, { message: "Minimum 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", secretKey: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const usersRaw = localStorage.getItem("users");
    const users: Record<string, any> = usersRaw ? JSON.parse(usersRaw) : {};
    const user = users[values.email];

    if (!user) {
      alert("No account found for this email");
      return;
    }
    if (user.secretKey !== values.secretKey) {
      alert("Invalid secret key");
      return;
    }

    users[values.email] = { ...user, password: values.newPassword };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated. Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your secret key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Reset</Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Remembered your password? <Link to="/signin" className="underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
