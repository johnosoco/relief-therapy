import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';

// Using localStorage for simple session persistence. In a real app, you'd use secure tokens.
const USER_STORAGE_KEY = 'relief-psych-user';
const RESET_TOKEN_KEY = 'relief-psych-reset-token';


export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  signup: (name: string, email: string, pass: string) => Promise<User>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => Promise<User>;
  sendPasswordResetLink: (email: string) => Promise<string>;
  resetPassword: (token: string, newPass: string) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIX: Changed component props to use PropsWithChildren to fix type error in index.tsx.
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user in localStorage on initial load.
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, you'd verify credentials against a backend.
        // For this demo, we'll accept 'test@example.com' with 'password' or any new user.
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (email === 'test@example.com' && pass === 'password') {
            const loggedInUser: User = { name: 'Test User', email };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
            setUser(loggedInUser);
            setIsLoading(false);
            resolve(loggedInUser);
        } else if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.email === email) { // Simple check, no password validation for demo
                 setUser(parsedUser);
                 setIsLoading(false);
                 resolve(parsedUser);
            }
        }
        setIsLoading(false);
        reject(new Error('Invalid email or password.'));
      }, 1000);
    });
  };
  
  const signup = async (name: string, email: string, pass: string): Promise<User> => {
    setIsLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { name, email };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const updateUser = async (updatedData: Partial<User>): Promise<User> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!user) {
                setIsLoading(false);
                return reject(new Error("No user is logged in."));
            }
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsLoading(false);
            resolve(updatedUser);
        }, 500); // Simulate network delay
    });
  };

  const sendPasswordResetLink = async (email: string): Promise<string> => {
      setIsLoading(true);
      return new Promise((resolve) => {
          setTimeout(() => {
              // In a real app, you'd check if the user exists and send an email.
              // For security, we resolve even if the user doesn't exist.
              // For this demo, we'll generate and store a token.
              const token = `demo-token-${Date.now()}`;
              const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
              localStorage.setItem(RESET_TOKEN_KEY, JSON.stringify({ email, token, expires }));
              console.log(`Password reset link for ${email} would be sent. Token: ${token}`);
              setIsLoading(false);
              resolve(token);
          }, 1000);
      });
  };

  const resetPassword = async (token: string, newPass: string): Promise<void> => {
      setIsLoading(true);
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const storedTokenData = localStorage.getItem(RESET_TOKEN_KEY);
              if (!storedTokenData) {
                  setIsLoading(false);
                  return reject(new Error("Invalid or expired reset token."));
              }
              const { token: storedToken, expires } = JSON.parse(storedTokenData);
              if (storedToken !== token || Date.now() > expires) {
                  localStorage.removeItem(RESET_TOKEN_KEY);
                  setIsLoading(false);
                  return reject(new Error("Invalid or expired reset token."));
              }
              
              // In a real app, you'd update the password on the backend.
              // Here, we just log it and clear the token.
              console.log(`Password for user successfully reset with new password: ${newPass}`);
              localStorage.removeItem(RESET_TOKEN_KEY);
              setIsLoading(false);
              resolve();
          }, 1000);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const value = { user, login, signup, logout, updateUser, sendPasswordResetLink, resetPassword, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};