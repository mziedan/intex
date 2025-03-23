
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as UserRole
  }
];

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('learnalot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const foundUser = MOCK_USERS.find(u => 
      u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    // Remove password before storing in state/localStorage
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Set user in state and localStorage
    setUser(userWithoutPassword);
    localStorage.setItem('learnalot_user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // In a real app, you would save this to your database
    // Here we're just simulating a successful registration
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      role: 'user'
    };
    
    setUser(newUser);
    localStorage.setItem('learnalot_user', JSON.stringify(newUser));
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnalot_user');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        isAdmin: user?.role === 'admin'
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
