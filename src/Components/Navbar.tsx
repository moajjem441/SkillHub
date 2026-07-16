"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Link, Button } from "@heroui/react";
import { FiBookOpen, FiSearch, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links Definition
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
      {/* Main Container Header */}
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* --- LEFT: LOGO SECTION --- */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-foreground-500 hover:text-foreground sm:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <NextLink href="/" className="flex items-center gap-2 font-bold text-xl text-foreground group">
            <div className="bg-primary/10 p-1.5 rounded-xl text-primary transition-transform group-hover:scale-105">
              <FiBookOpen size={22} />
            </div>
            <span>Skill<span className="text-primary">Hub</span></span>
          </NextLink>
        </div>

        {/* --- CENTER: DESKTOP NAVIGATION LINKS --- */}
        <ul className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  as={NextLink}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-foreground-500 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* --- RIGHT: ACTIONS (SEARCH & AUTH BUTTONS) --- */}
        <div className="flex items-center gap-3">
          {/* Search Action */}
          <Button
            isIconOnly
            variant="light"
            radius="full"
            aria-label="Search courses"
            className="text-foreground-500 hover:text-foreground"
          >
            <FiSearch size={20} />
          </Button>

          {/* Login Button */}
          <Button
            as={NextLink}
            href="/login"
            variant="light"
            radius="xl"
            className="hidden sm:inline-flex text-sm font-medium text-foreground"
          >
            Login
          </Button>

          {/* Register Button */}
          <Button
            as={NextLink}
            href="/register"
            color="primary"
            variant="solid"
            radius="xl"
            className="text-sm font-semibold shadow-sm"
          >
            Register
          </Button>
        </div>
      </header>

      {/* --- MOBILE DRAWDOWN / MENU OVERLAY --- */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-divider bg-background px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    as={NextLink}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full py-2 text-base font-medium transition-colors ${
                      isActive ? "text-primary font-semibold" : "text-foreground-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Mobile Auth Secondary Partition */}
          <div className="pt-4 border-t border-divider flex flex-col gap-2">
            <Button
              as={NextLink}
              href="/login"
              variant="flat"
              radius="xl"
              className="w-full font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}