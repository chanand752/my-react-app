
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, googleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would authenticate with Google OAuth
    // For now, we'll use a test Gmail account
    setIsLoading(true);
    googleLogin('google@example.com')
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-background">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Sign in</h1>
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={isLoading}
              onClick={handleGoogleLogin}
            >
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Image & Branding */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 flex flex-col justify-between">
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-6">Your superhuman full stack engineer.</h2>
          <p className="text-lg">You ask, Mind Labz AI</p>
        </div>
        <div className="text-sm text-gray-400">Made with Mind Labz AI</div>
      </div>
    </div>
  );
};

export default SignIn;
