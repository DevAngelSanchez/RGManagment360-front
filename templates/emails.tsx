import * as React from 'react';

interface props {
  token: string;
  nextAuthUrl?: string;
}

export const VerificationEmailTemplate: React.FC<props> = ({
  token,
  nextAuthUrl
}) => (
  <div>
    <h1>Please click on link below to verify your account</h1>
    <a href={`${nextAuthUrl}/api/auth/verify-email?token=${token}`}>Verify your email</a>
  </div>
);