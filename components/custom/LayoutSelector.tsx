import React, { ReactNode } from 'react';
import AuthLayout from './AuthLayout';
import DefaultLayout from './DefaultLayout';
type LayoutSelectorProps = {
  layout: 'login/register' | 'default';
  children: ReactNode
  
};

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ layout, children }) => {
  return layout === 'login/register' ? <AuthLayout>{children}</AuthLayout> : <DefaultLayout>{children}</DefaultLayout>;
};

export default LayoutSelector;