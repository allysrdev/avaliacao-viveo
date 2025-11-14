"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import LogoViveo from "@/assets/viveo-logo.svg";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .email("Informe um email válido")
    .nonempty("O email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres")
    .nonempty("A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!savedUser.email) {
      setError("Nenhuma conta cadastrada!");
      setLoading(false);
      return;
    }

    if (
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      localStorage.setItem("session", "logged");

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 800);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError("Dados incorretos");
      }, 800);
    }
  };
  return (
    <Card
      className="w-full flex flex-col items-center justify-center max-w-sm shadow-xl border border-zinc-300"
      sx={{
        borderRadius: 5,
      }}
    >
      <Image src={LogoViveo} alt="Viveo" className="w-24 h-24 mt-4" />

      <CardContent className="flex flex-col gap-6 p-6">
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-900"
        >
          Entre em sua conta
        </Typography>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{
              border: "1px solid lightgrey",
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            sx={{
              border: "1px solid lightgrey",
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Entrar"}
          </Button>
        </form>

        {error && (
          <p className="text-center font-bold text-sm text-red-600">{error}</p>
        )}

        <p className="text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Criar cadastro
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
