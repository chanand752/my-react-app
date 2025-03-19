
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useInView } from '@/lib/animations';

const products = [
  {
    title: "Premium Design System",
    description: "A comprehensive collection of components, styles, and guidelines to create cohesive interfaces.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
    tag: "Design"
  },
  {
    title: "Interactive Prototyping",
    description: "Create high-fidelity interactive prototypes that feel like the real product.",
    image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=2072&auto=format&fit=crop",
    tag: "Prototyping"
  },
  {
    title: "Development Resources",
    description: "Code snippets, documentation, and tools to bring designs to life quickly and accurately.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2069&auto=format&fit=crop",
    tag: "Development"
  }
];

const Products = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(productsRef);

  return (
    <section
      id="products"
      ref={productsRef}
      className="section relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div 
            className={cn(
              "inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium transition-all duration-700", 
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Products
          </div>
          
          <h2 
            className={cn(
              "transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Elevate your workflow
          </h2>
          
          <p 
            className={cn(
              "mt-4 text-lg text-muted-foreground transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Discover our suite of products designed to enhance your creative process and development pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.title}
              className={cn(
                "group relative overflow-hidden rounded-lg transition-all duration-700",
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              )}
              style={{ 
                transitionDelay: isInView ? `${300 + (index * 150)}ms` : '0ms'
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                {/* Image with lazy loading and blur effect */}
                <div className="absolute inset-0 bg-muted animate-pulse" />
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.classList.remove('opacity-0');
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/30 backdrop-blur-md text-white text-xs font-medium rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col">
                  <h3 className="text-white text-xl font-medium mb-2">{product.title}</h3>
                  <p className="text-white/80 mb-4 text-sm">{product.description}</p>
                  <Button variant="outline" className="w-full mt-auto backdrop-blur-sm bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Products;
