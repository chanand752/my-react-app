
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useInView } from '@/lib/animations';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef);
  const { isAuthenticated } = useAuth();

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="hero"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/40 pointer-events-none" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-24 top-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute right-1/4 bottom-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={cn(
              "inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-700", 
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            AI-Powered Solutions
          </div>
          
          <h1 
            className={cn(
              "font-medium tracking-tight transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="block">Elevate your workflow with</span>
            <span className="text-gradient">Mind Labz AI</span>
          </h1>
          
          <p 
            className={cn(
              "mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Experience next-generation AI tools designed to transform how you work, communicate, and analyze information.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-700 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {!isAuthenticated ? (
              <>
                <Link to="/signin">
                  <Button size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" state={{ dashboard: 1 }}>
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* AI image */}
        <div 
          className={cn(
            "mt-16 relative max-w-4xl mx-auto transition-all duration-1000 delay-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          )}
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
            <div className="aspect-[16/9] bg-gradient-to-br from-blue-950 to-purple-900 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="relative w-full max-w-2xl">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  {/* AI Brain Visualization */}
                  <div className="relative bg-black/30 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 flex flex-col space-y-4">
                        <div className="h-8 w-full bg-blue-500/20 rounded-md animate-pulse" />
                        <div className="h-8 w-3/4 bg-blue-500/20 rounded-md animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="h-8 w-full bg-blue-500/20 rounded-md animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <div className="h-8 w-2/3 bg-blue-500/20 rounded-md animate-pulse" style={{ animationDelay: '0.6s' }} />
                      </div>
                      <div className="col-span-2 bg-blue-500/10 rounded-xl overflow-hidden">
                        <div className="p-4">
                          <div className="w-full h-56 relative">
                            {/* AI Brain Network Visualization */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full bg-blue-500/30 animate-pulse flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-blue-500/60" />
                              </div>
                            </div>
                            
                            {/* Connection Lines */}
                            <div className="absolute inset-0">
                              <svg className="w-full h-full" viewBox="0 0 200 200">
                                <path d="M100,70 L60,40" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                <path d="M100,70 L140,40" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                <path d="M100,70 L40,90" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                <path d="M100,70 L160,90" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                <path d="M100,70 L70,130" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                <path d="M100,70 L130,130" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
                                
                                <circle cx="60" cy="40" r="6" fill="rgba(59, 130, 246, 0.6)" />
                                <circle cx="140" cy="40" r="6" fill="rgba(59, 130, 246, 0.6)" />
                                <circle cx="40" cy="90" r="6" fill="rgba(59, 130, 246, 0.6)" />
                                <circle cx="160" cy="90" r="6" fill="rgba(59, 130, 246, 0.6)" />
                                <circle cx="70" cy="130" r="6" fill="rgba(59, 130, 246, 0.6)" />
                                <circle cx="130" cy="130" r="6" fill="rgba(59, 130, 246, 0.6)" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <div className="w-32 h-4 bg-blue-500/20 rounded animate-pulse" />
                      <div className="w-24 h-4 bg-purple-500/20 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
