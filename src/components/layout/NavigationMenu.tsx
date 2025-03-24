
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useCourses } from '@/context/CourseContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

export function MainNavigationMenu() {
  const { categories } = useCourses();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Courses dropdown with nested categories and subcategories */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[600px] p-0 left-0">
            <div className="flex">
              {/* Main categories column */}
              <div className="w-1/2 bg-background border-r border-border">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/courses/${category.slug}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                    onMouseEnter={() => setActiveCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    {category.subcategories.length > 0 && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Subcategories column */}
              <div className="w-1/2 bg-popover">
                {activeCategory && categories.find(c => c.id === activeCategory)?.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/courses/${categories.find(c => c.id === activeCategory)?.slug}/${subcategory.slug}`}
                    className="block px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* About page link */}
        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        {/* Contact page link */}
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
