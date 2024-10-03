import React, { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import DefaultLayout from "./DefaultLayout";
import ServiceProviderLayout from "./ServiceProviderLayout";
type LayoutSelectorProps = {
  layout: "login/register" | "default" | "service-provider";
  children: ReactNode;
};

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layout,
  children,
}) => {
  return layout === "login/register" ? (
    <AuthLayout>{children}</AuthLayout>
  ) : layout === "service-provider" ? (
    <ServiceProviderLayout>{children}</ServiceProviderLayout>
  ) : (
    <DefaultLayout>{children}</DefaultLayout>
  );
};

export default LayoutSelector;
