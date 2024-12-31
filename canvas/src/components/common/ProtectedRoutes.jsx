import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      if (!user && !loading) {
        navigate("/", { replace: true });
      } 
    };

    checkUser();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : null;
}
