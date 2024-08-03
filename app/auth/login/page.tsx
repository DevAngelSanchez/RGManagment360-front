import Link from "next/link";
import { LoginForm } from "./form";
import AuthLayout from "@/components/custom/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-2 items-center justify-between p-8">
        <h1 className="text-primary font-semibold text-2xl text-center">
          Welcome back!
        </h1>
        <LoginForm />
        <div className="flex flex-col gap-2 items-center">
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              className="text-indigo-500 font-semibold hover:underline"
              href="/auth/register"
            >
              Sign up now
            </Link>
          </p>
          <Link
            className="text-sm hover:text-indigo-500 hover:underline transition"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-full bg-primary p-8 rounded-tr-xl rounded-br-xl">
        <h2 className="text-2xl font-bold text-center max-w-[290px] text-primary-foreground">
          Property Managment Customer
        </h2>
        <img
          src="/img/register.jpg"
          alt="office background"
          className="w-full rounded-xl shadow-md"
        />
        <p className="text-sm font-semibold text-center max-w-[300px] text-primary-foreground">
          Log in to manage your properties
        </p>
      </div>
    </AuthLayout>
  );
}
