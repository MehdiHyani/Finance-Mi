import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../app/user.context";

const AuthGuard = () => {
  const user = useAuthStore((state) => state.user);
  if (user) return <Outlet />;
  else {
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;
