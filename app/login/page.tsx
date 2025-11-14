import Link from "next/link";
import LoginForm from "./_components/LoginForm";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 gap-10">
      <LoginForm />
      <Link href={"/"} className="underline">
        <KeyboardReturnIcon />
        Voltar
      </Link>
    </main>
  );
}
