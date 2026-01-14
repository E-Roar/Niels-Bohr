import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    email: string;
    name: string;
    role: 'admin';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials - will be replaced with Supabase later
const MOCK_CREDENTIALS = {
    email: 'demo@NielsBohr.com',
    password: 'demo123',
    user: {
        email: 'demo@NielsBohr.com',
        name: 'Admin Niels Bohr',
        role: 'admin' as const,
    },
};

const AUTH_STORAGE_KEY = 'melrose_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setError(null);
        setIsLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
            setUser(MOCK_CREDENTIALS.user);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(MOCK_CREDENTIALS.user));
            setIsLoading(false);
            return true;
        }

        setError('Email ou mot de passe incorrect');
        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            error,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Protected Route component
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-melrose-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login
        window.location.href = '/admin/login';
        return null;
    }

    return <>{children}</>;
};
