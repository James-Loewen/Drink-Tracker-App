import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { login, logout, type LoginResponseType } from "../services/auth";

type UserDetails = {
  username: string;
  display_username: string;
  display_name: string;
  email: string;
};

type AuthContextType = {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  login: (username: string, password: string) => Promise<LoginResponseType>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

type AuthProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      const res = await fetch("http://localhost:8000/auth/user/", {
        method: "GET",
        credentials: "include",
      });

      if (res.status !== 200) {
        setIsLoading(false);
        setUser(null);
      }

      const data = await res.json();
      console.log(data);
      setIsLoading(false);
      setUser(data);
    }

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}