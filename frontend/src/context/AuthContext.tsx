import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  login,
  logout,
  API_PATH,
  type LoginRegisterResponseType,
  type UserDetails,
} from "../api/auth";

type AuthContextType = {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
  login: (
    username: string,
    password: string
  ) => Promise<LoginRegisterResponseType>;
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
      // const res = await fetch(`${API_PATH}/api/auth/user/`, {
      const res = await fetch(`${API_PATH}/auth/user/`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status !== 200) {
        setIsLoading(false);
        setUser(null);
      }

      const data = await res.json();
      setIsLoading(false);
      setUser(data);
    }

    fetchUserDetails();
  }, []);

  const value = {
    user,
    setUser,
    login,
    logout,
  };

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
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
}

export function useAuth() {
  return useContext(AuthContext);
}
