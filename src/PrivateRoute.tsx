import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setCredentials } from "./store/slices/authSlice";

function PrivateRoute() {
  const tokenData = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  if (tokenData) {
    const [accessToken, user] = JSON.parse(tokenData);

    if (!currentUser) {
      dispatch(setCredentials({ user, token: accessToken }));
    }
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;
