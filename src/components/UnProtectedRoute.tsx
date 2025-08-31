import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useIsLoggedIn } from "../store/useIsLoggedIn";

export const UnProtectedRoute = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to="/todos" replace />;
  }

  return children;
};
