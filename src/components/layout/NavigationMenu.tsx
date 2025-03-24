
import React from 'react';
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

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Courses dropdown with nested categories and subcategories */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[600px]">
            <div className="grid grid-cols-2 gap-3 p-4">
              {categories.map((category) => (
                <div key={category.id} className="relative group">
                  <Link
                    to={`/courses/${category.slug}`}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium leading-none">{category.name}</div>
                      <ChevronRight className="h-4 w-4 opacity-70" />
                    </div>
                  </Link>
                  
                  <div className="absolute left-full top-0 ml-1 hidden w-[200px] rounded-md border bg-popover p-2 group-hover:block">
                    <Link
                      to={`/courses/${category.slug}`}
                      className="block select-none space-y-1 rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      All {category.name}
                    </Link>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/courses/${category.slug}/${subcategory.slug}`}
                        className="block select-none space-y-1 rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
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
