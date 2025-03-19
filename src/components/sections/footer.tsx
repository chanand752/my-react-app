
import React from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Products",
      links: [
        { label: "Design System", href: "#" },
        { label: "Prototyping", href: "#" },
        { label: "Development", href: "#" },
        { label: "Resources", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Support", href: "#" },
        { label: "Community", href: "#" }
      ]
    }
  ];
  
  return (
    <footer className="bg-muted/40 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <a href="#" className="text-xl font-medium inline-block">
              Mind Labz AI
              </a>
              <p className="text-muted-foreground">
                Creating beautiful digital experiences with precision and care.
              </p>
              
              <div className="flex space-x-4">
                {['twitter', 'instagram', 'github', 'dribbble'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center transition-colors hover:bg-primary/10"
                    aria-label={`${social} profile`}
                  >
                    <div className="w-5 h-5 rounded-full bg-foreground/40 flex items-center justify-center">
                      <span className="sr-only">{social}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="text-sm font-medium uppercase tracking-wider">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href} 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-8 bg-border/50" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mind Labz AI. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
