import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return <Card className="w-[400px] shadow-md">Login Form</Card>;
};
