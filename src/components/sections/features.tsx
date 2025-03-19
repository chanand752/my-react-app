
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/container';
import { useInView } from '@/lib/animations';

const features = [
  {
    title: "Intuitive Design",
    description: "Created with user experience as the priority, ensuring every interaction feels natural and effortless.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 8V12L15 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12H4" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 6L7.41421 7.41421" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Stunning Visuals",
    description: "High-quality aesthetics with attention to every visual detail, creating an immersive and cohesive experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="2.5" strokeWidth="2" />
        <path d="M21 15L16.54 11.29C16.2206 11.024 15.8226 10.8787 15.4125 10.8787C15.0024 10.8787 14.6044 11.024 14.285 11.29L4 20" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Modern Interactions",
    description: "Smooth, responsive interactions that provide immediate feedback and delight users with every click and swipe.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <path d="M21 14C21 14 18 11 12 11C6 11 3 14 3 14" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 10C3 10 6 7 12 7C18 7 21 10 21 10" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Thoughtful Details",
    description: "Every element has been carefully considered, from spacing and typography to color and motion.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" />
        <path d="M12 17V17.01" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14C11.9816 13.5656 12.1622 13.1491 12.4856 12.8677C12.809 12.5862 13.1467 12.3435 13.4929 12.1155C13.839 11.8876 14.1415 11.6516 14.4001 11.4074C14.6587 11.1632 14.8177 10.8699 14.877 10.5275C14.9364 10.185 14.8931 9.83412 14.7512 9.51348C14.6094 9.19284 14.3733 8.91387 14.0658 8.70478C13.7583 8.49568 13.3875 8.36301 13 8.319C12.7869 8.29798 12.572 8.31137 12.364 8.35839C12.156 8.40542 11.9583 8.48534 11.7797 8.59418C11.6012 8.70302 11.4444 8.83903 11.3164 8.9964C11.1884 9.15377 11.0911 9.33036 11.0293 9.51954" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Responsive Layout",
    description: "Perfectly adapts to any device or screen size, providing an optimal experience from desktop to mobile.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
        <path d="M2 8H22" strokeWidth="2" strokeLinecap="round" />
        <path d="M9.5 16H14.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Performance First",
    description: "Optimized for speed and efficiency, ensuring a smooth experience without compromising on quality.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current">
        <path d="M12 2V6" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 18V22" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.93 4.93L7.76 7.76" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.24 16.24L19.07 19.07" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12H6" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 12H22" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.93 19.07L7.76 16.24" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.24 7.76L19.07 4.93" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
];

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { threshold: 0.1 });

  return (
    <section
      id="features"
      ref={featuresRef}
      className="section relative overflow-hidden bg-secondary/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 top-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -left-64 bottom-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div 
            className={cn(
              "inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-700", 
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Features
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Designed with <span className="text-gradient">precision</span>
          </h2>
          
          <p 
            className={cn(
              "mt-4 text-lg text-muted-foreground transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Every feature has been thoughtfully implemented to create a seamless and delightful user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={cn(
                "bg-background border rounded-lg p-6 shadow-sm transition-all duration-700",
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12",
                // Stagger the animation delay based on index
                isInView && `delay-[${300 + (index * 100)}ms]`
              )}
              style={{ 
                transitionDelay: isInView ? `${300 + (index * 100)}ms` : '0ms'
              }}
            >
              <div className="p-2 w-12 h-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
