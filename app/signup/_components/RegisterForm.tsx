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

const registerSchema = z
  .object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .email("Informe um email válido")
      .nonempty("O email é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .nonempty("A senha é obrigatória"),
    confirmPassword: z.string().nonempty("Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    localStorage.setItem("user", JSON.stringify(data));

    setTimeout(() => {
      setLoading(false);
      alert("Conta criada com sucesso!");
      window.location.href = "/login";
    }, 800);
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
          Criar sua conta
        </Typography>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome completo"
            fullWidth
            sx={{ border: "1px solid lightgrey" }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{ border: "1px solid lightgrey" }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            sx={{ border: "1px solid lightgrey" }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <TextField
            label="Confirmar senha"
            type="password"
            fullWidth
            sx={{ border: "1px solid lightgrey" }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Cadastrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Já possui conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Entrar agora
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
