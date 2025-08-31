import { type PropsWithChildren } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Spinner } from "@chakra-ui/react";

const StartWrapper = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <Spinner />;
  }

  return children;

};

export default StartWrapper;
