import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { login, logout, type LoginResponseType } from "../api/auth";

type UserDetails = {
  full_name: string;
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

interface AuthProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      // const res = await fetch("http://localhost:8000/auth/user/", {
      const res = await fetch("http://localhost:8000/api/auth/user", {
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

  // if (isLoading) {
  //   return (
  //     // <div className="w-full h-screen flex justify-center items-center">
  //     //   <h1 className="font-bold text-lg">Loading...</h1>
  //     // </div>
  //     <></>
  //   );
  // }

  if (!isLoading) {
    return (
      <AuthContext.Provider value={{ user, setUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export function useAuth() {
  return useContext(AuthContext);
}
