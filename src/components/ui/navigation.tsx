
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Container from './container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, hasAccess } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <Container className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-medium">
            Mind Labz AI 
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {hasAccess('chatbot') && (
                <Link to="/chatbot">
                  <Button variant="outline" className="ml-2">
                    Chatbot AI
                  </Button>
                </Link>
              )}
              {hasAccess('transcript') && (
                <Link to="/transcript">
                  <Button variant="outline" className="ml-2">
                    Transcript AI
                  </Button>
                </Link>
              )}
              {hasAccess('dada') && (
                <Link to="/dada">
                  <Button variant="outline" className="ml-2">
                    DADA AI
                  </Button>
                </Link>
              )}
              <div className="flex items-center ml-4 border-l pl-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-2">
                      <User size={18} />
                      <span className="text-sm font-medium">{user?.username}</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <span 
              className={cn(
                "h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
              )}
            />
            <span 
              className={cn(
                "h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-0 opacity-0" : "w-4"
              )}
            />
            <span 
              className={cn(
                "h-0.5 bg-foreground transition-all duration-300",
                isMobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
              )}
            />
          </div>
        </button>
      </Container>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col pt-24 px-6 pb-8 transition-all duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-6">
          {isAuthenticated ? (
            <>
              {hasAccess('chatbot') && (
                <Link 
                  to="/chatbot" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium"
                >
                  Chatbot AI
                </Link>
              )}
              {hasAccess('transcript') && (
                <Link 
                  to="/transcript" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium"
                >
                  Transcript AI
                </Link>
              )}
              {hasAccess('dada') && (
                <Link 
                  to="/dada" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium"
                >
                  DADA AI
                </Link>
              )}
              <div className="flex items-center border-t pt-6">
                <span className="text-lg font-medium mr-4">{user?.username}</span>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/signin" 
                className="text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
