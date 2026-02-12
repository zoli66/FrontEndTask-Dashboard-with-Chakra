import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setCredentials } from "./store/slices/authSlice";

function PrivateRoute() {
  const [accessToken, user] = JSON.parse(
    localStorage.getItem("token") || "null",
  );
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  if (accessToken && !currentUser) {
    dispatch(setCredentials({ user, token: accessToken }));
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
