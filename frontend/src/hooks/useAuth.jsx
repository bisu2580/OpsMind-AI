import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${url}/api/auth/get-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch user");
        const res = await response.json();
        setUser(res.data || null);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { user, loading, isAuthenticated: !!user };
}
