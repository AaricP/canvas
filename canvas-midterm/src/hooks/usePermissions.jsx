import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function usePermissions() {
  const [authorized, setAuthorized] = useState(false);
  const { userApi, user } = useAuth();

  useEffect(() => {
    const checkPermissions = async () => {
      if (user) {

        if (user.userType === "teacher") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } else {
        setAuthorized(false);
      }
    };
    checkPermissions();
  }, [ user ]);

  return authorized;
}
