import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  isFirebaseInitialized,
} from "../services/firebase";
import { supabase } from "../services/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "facebook";
  phone?: string;
  address?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  role?: "Admin" | "Cliente";
  status?: "Ativo" | "Inativo";
}

interface UserAuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  socialLogin: (provider: "google" | "facebook") => Promise<void>;
  register: (data: Partial<User> & { password?: string }) => Promise<boolean>;
  deleteAccount: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseInitialized || !auth) {
      const storedUser = localStorage.getItem("mockUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => {
    const providerData = firebaseUser.providerData[0];
    return {
      id: firebaseUser.uid,
      name:
        firebaseUser.displayName ||
        firebaseUser.email?.split("@")[0] ||
        "Usuário",
      email: firebaseUser.email || "",
      avatar: firebaseUser.photoURL || undefined,
      provider: providerData?.providerId.includes("google")
        ? "google"
        : providerData?.providerId.includes("facebook")
          ? "facebook"
          : "email",
    };
  };

  const login = async (email: string, pass: string) => {
    if (email === "admin@digitalstore.com" && pass === "Admin@1234") {
      const adminUser: User = {
        id: "admin-id",
        name: "Administrador",
        email: "admin@digitalstore.com",
        role: "Admin",
        status: "Ativo",
        provider: "email",
      };
      setUser(adminUser);
      localStorage.setItem("mockUser", JSON.stringify(adminUser));
      return true;
    }

    try {
      const { data: foundUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", pass)
        .single();

      if (foundUser) {
        if (foundUser.status === "Inativo") {
          alert("Esta conta foi desativada pelo administrador.");
          return false;
        }

        const { password, ...userWithoutPass } = foundUser;
        const mappedUser: User = {
          id: userWithoutPass.id,
          name: userWithoutPass.name,
          email: userWithoutPass.email,
          phone: userWithoutPass.phone,
          address: userWithoutPass.address,
          bairro: userWithoutPass.bairro,
          cidade: userWithoutPass.cidade,
          cep: userWithoutPass.cep,
          role: userWithoutPass.role as "Admin" | "Cliente",
          status: userWithoutPass.status as "Ativo" | "Inativo",
          provider: userWithoutPass.provider || "email",
        };

        setUser(mappedUser);
        localStorage.setItem("mockUser", JSON.stringify(mappedUser));
        return true;
      }
    } catch (err) {
      console.warn(
        "Supabase login failed, trying local storage or firebase",
        err,
      );
    }

    const usersDb = JSON.parse(localStorage.getItem("users_db") || "[]");
    const localUser = usersDb.find(
      (u: any) => u.email === email && u.password === pass,
    );

    if (localUser) {
      if (localUser.status === "Inativo") {
        alert("Esta conta foi desativada pelo administrador.");
        return false;
      }
      const { password, ...userWithoutPass } = localUser;
      setUser(userWithoutPass);
      localStorage.setItem("mockUser", JSON.stringify(userWithoutPass));
      return true;
    }

    if (auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        return true;
      } catch (error) {
        console.error("Login error:", error);
      }
    }

    return false;
  };

  const socialLogin = async (provider: "google" | "facebook") => {
    if (!auth) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        name:
          provider === "google"
            ? "Usuário Google (Demo)"
            : "Usuário Facebook (Demo)",
        email: `demo@${provider}.com`,
        avatar:
          provider === "google"
            ? "https://ui-avatars.com/api/?name=Google+User&background=random"
            : "https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff",
        provider: provider,
      };
      setUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return;
    }
    try {
      const authProvider =
        provider === "google" ? googleProvider : facebookProvider;
      await signInWithPopup(auth, authProvider);
    } catch (error) {
      console.error("Social login error:", error);
      throw error;
    }
  };

  const register = async (data: Partial<User> & { password?: string }) => {
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", data.email)
      .single();

    if (existingUser) {
      return false;
    }

    const newUser = {
      name: data.name || data.email?.split("@")[0] || "User",
      email: data.email || "",
      password: data.password,
      phone: data.phone,
      address: data.address,
      bairro: data.bairro,
      cidade: data.cidade,
      cep: data.cep,
      role: "Cliente",
      status: "Ativo",
      provider: "email",
      id: `user-${Date.now()}`,
    };

    try {
      const { error } = await supabase.from("users").insert(newUser);

      if (error) {
        console.error("Supabase register error:", error);
        throw error;
      }
    } catch (err) {
      console.warn("Supabase register failed, falling back to local", err);
      const usersDb = JSON.parse(localStorage.getItem("users_db") || "[]");
      usersDb.push(newUser);
      localStorage.setItem("users_db", JSON.stringify(usersDb));
    }

    if (!auth) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }

    try {
      if (!data.password || !data.email)
        throw new Error("Email and Password required");
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return true;
    }
  };

  const deleteAccount = async () => {
    if (!auth) {
      setUser(null);
      localStorage.removeItem("mockUser");
      return;
    }
    try {
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("mockUser");

    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        login,
        socialLogin,
        register,
        deleteAccount,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
