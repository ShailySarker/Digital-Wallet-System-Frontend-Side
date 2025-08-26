import LazyLoader from "@/components/shared/LazyLoader";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { isLoading, data } = useMyProfileQuery(undefined);

    if (isLoading) {
      return <LazyLoader />;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && !data?.data?.role.includes(requiredRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
