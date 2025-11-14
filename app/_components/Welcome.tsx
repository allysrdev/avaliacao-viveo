"use client";
import LogoViveo from "@/assets/viveo-logo.svg";
import AvatarAllyson from "@/assets/allyson.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Welcome() {
  const router = useRouter();

  function handleStart() {
    router.push("/login");
  }
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-10 
  "
    >
      <div
        className="
            w-full max-w-md backdrop-blur-xl bg-zinc-50
            border border-slate-300
            shadow-xl shadow-black/10
            rounded-3xl p-8
            flex flex-col items-center gap-6
          "
      >
        <Image
          src={LogoViveo}
          alt="Viveo"
          className="w-40 opacity-90 drop-shadow-sm"
        />

        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Avaliação Técnica
        </h1>

        <div className="flex flex-col items-center gap-3">
          <Image
            src={AvatarAllyson}
            alt="Allyson Santana"
            className="w-24 h-24 rounded-full object-cover shadow-lg shadow-black/20"
          />

          <h2 className="text-xl font-medium text-gray-800">Allyson Santana</h2>
          <p className="text-gray-600 text-sm">Desenvolvedor Front-End Jr.</p>
        </div>

        <Button onClick={handleStart} variant="contained">
          Iniciar
        </Button>
      </div>
    </div>
  );
}
