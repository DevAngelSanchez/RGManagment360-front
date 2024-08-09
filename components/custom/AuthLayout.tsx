import React, { ReactNode } from "react";

type AuthProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-200">
      <div className="shadow-xl bg-white rounded-xl flex max-w-[920px] w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
