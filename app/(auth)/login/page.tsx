import Link from "next/link";
import { LoginForm } from "./form";
import LayoutSelector from "@/components/custom/LayoutSelector";
import Image from "next/image";
import ButtonSocial from "./googleSignIn";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage({
  searchParams
}: {
  searchParams: { verified: string }
}) {

  const isVerified = searchParams.verified === "true";

  return (
    <LayoutSelector layout="login/register">
      <div className="flex flex-col gap-2 items-center justify-between p-8">
        <h1 className="text-primary font-semibold text-2xl text-center">
          Welcome back!
        </h1>

        <LoginForm isVerified={isVerified} />
        <span>Or Sign in with</span>

        <ButtonSocial provider="google">
          <IconBrandGoogle size={16} className="mr-2" />
          Sign in with Google
        </ButtonSocial>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              className="text-indigo-500 font-semibold hover:underline"
              href="/register"
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
          Property Managment
        </h2>
        <Image
          src="/img/register.jpg"
          alt="office background"
          className="w-full rounded-xl shadow-md"
          width={400} height={300}
        />
        <p className="text-sm font-semibold text-center max-w-[300px] text-primary-foreground">
          Log in to manage your properties
        </p>
      </div>
    </LayoutSelector>
  );
}
