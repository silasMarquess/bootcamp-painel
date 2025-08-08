"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const userRegisterSchame = z
  .object({
    name: z
      .string("nome invalido")
      .min(3, "nome deve te pelo menos 3 caracteres"),
    email: z.email("email invalido"),
    password: z
      .string("Senha Invalida")
      .min(3, "Senha deve ter pelo menos 3 caracteres"),

    passwordConfirmation: z
      .string("Senha Invalida")
      .min(3, "Senha deve ter pelo menos 3 caracteres"),
  })
  .refine(
    (value) => {
      return value.password === value.passwordConfirmation;
    },
    {
      error: "senha não são iguais",
      path: ["passwordConfirmation"],
    },
  );

const ReguistePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof userRegisterSchame>>({
    resolver: zodResolver(userRegisterSchame),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userRegisterSchame>) {
    const { data, error } = await authClient.signUp.email({
      name: values.name, // required
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Usuario cadastrado com sucesso");
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            console.log("silas");
            form.setError("email", {
              message: "email ja cadastrado ou usuario ja existente",
            });
            toast.error("email ja cadastrado");
          }
          toast.error(error.error.message);
        },
      },
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar</CardTitle>
              <CardDescription>cadastre-se aqui</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="informe o seu name de usuario"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="informe seu email"
                        type="email"
                        {...field}
                      />
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
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="informe sua nova senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirme sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <CardFooter>
            {" "}
            <Button type="submit">Cadastrar</Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
};

export default ReguistePage;
