
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  username: string;
  email: string;
  role?: 'admin' | 'chatuser' | 'transcriptuser' | 'general';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (email: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasAccess: (feature: 'chatbot' | 'transcript' | 'dada') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default users for testing with roles
const DEFAULT_USERS = [
  { username: 'testuser', email: 'test@example.com', password: 'password123', role: 'general' },
  { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { username: 'chatuser', email: 'chatuser@testmail.com', password: 'user@123', role: 'chatuser' },
  { username: 'transcriptuser', email: 'transcrpit@testmail.com', password: 'User@123', role: 'transcriptuser' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to check if user has access to a specific feature
  const hasAccess = (feature: 'chatbot' | 'transcript' | 'dada') => {
    if (!user || !user.role) return false;
  
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Gmail users (general role) have access to everything
    if (user.role === 'general') return true;
    
    // Specific role-based access
    switch (feature) {
      case 'chatbot':
        return user.role === 'chatuser';
      case 'transcript':
        return user.role === 'transcriptuser';
      case 'dada':
        return false; // Only admin and general have access, already checked above
      default:
        return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Check if user exists in our default users or if it's stored in localStorage
      const storedUsers = localStorage.getItem('users');
      let users = DEFAULT_USERS;
      
      if (storedUsers) {
        users = [...users, ...JSON.parse(storedUsers)];
      }
      
      const matchedUser = users.find(u => u.email === email && u.password === password);
      
      if (matchedUser) {
        const userInfo = { 
          username: matchedUser.username, 
          email: matchedUser.email,
          role: matchedUser.role as 'admin' | 'chatuser' | 'transcriptuser' | 'general'
        };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        toast.success('Login successful');
        navigate('/');
      } else {
        throw new Error('Invalid credentials. Use test@example.com with password123');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const googleLogin = async (email: string) => {
    try {
      // For demo purposes, we'll just log in the test user
      const userInfo : User = { 
        username: 'Google User', 
        email: email,
        role: 'general'
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      toast.success('Google login successful');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
      throw error;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      // Simple validation
      if (!email || !password || !username) {
        throw new Error('Please fill all required fields');
      }

      // Check if user already exists
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const userExists = [...DEFAULT_USERS, ...users].some(u => u.email === email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }

      // Add new user with general role
      const newUser = { username, email, password, role: 'general' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log in the new user
      const userInfo = { username, email, role: 'general' as const };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        googleLogin,
        signup,
        logout,
        isAuthenticated: !!user,
        hasAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
