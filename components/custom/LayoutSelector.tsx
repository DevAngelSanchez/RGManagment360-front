import React, { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import DefaultLayout from "./DefaultLayout";
import ServiceProviderLayout from "./ServiceProviderLayout";
import LayoutCustomer from "./LayoutCustomer";
type LayoutSelectorProps = {
  layout: "login/register" | "default" | "service-provider" | "customer";
  children: ReactNode;
};

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layout,
  children,
}) => {
  switch (layout) {
    case "login/register":
      return <AuthLayout>{children}</AuthLayout>;
    case "service-provider":
      return <ServiceProviderLayout>{children}</ServiceProviderLayout>;
    case "customer":
      return <LayoutCustomer>{children}</LayoutCustomer>;
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
};

export default LayoutSelector;