import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate: React.FC<Readonly<RoleGateProps>> = ({
  children,
  allowedRole,
}) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You don't have permission to view this page" />;
  }
  return <>{children}</>;
};
