import Link from "next/link";
import { RegisterForm } from "./form";
import Image from "next/image";
import LayoutSelector from "@/components/custom/LayoutSelector";
export default function RegisterPage() {
  return (
    <LayoutSelector layout="login/register">
      <div className="flex flex-col gap-2 justify-center items-center p-8">
        <div className="flex items-center justify-center gap-2 flex-col">
          <h1 className="text-primary font-semibold text-2xl text-center">
            Create your account
          </h1>
        </div>
        <RegisterForm />
        <p className="text-center text-sm">
          Already have an account? <Link className="text-indigo-500 font-semibold hover:underline" href="/auth/login">Sign in</Link>
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 w-full bg-primary p-8 rounded-tr-xl rounded-br-xl">
        <h2 className="text-2xl font-bold text-center max-w-[290px] text-primary-foreground">Property Managment Customer</h2>
        <Image src="/img/register.jpg" alt="office background" className="w-full rounded-xl shadow-md" width={400} height={300} />
        <p className="text-sm font-semibold text-center max-w-[300px] text-primary-foreground">Create an account in order to access the administrator panel</p>
      </div>
    </LayoutSelector>
  );
}
