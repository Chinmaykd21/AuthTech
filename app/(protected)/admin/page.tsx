"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see information here!" />
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button>Click</Button>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button>Click</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;