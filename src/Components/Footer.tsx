"use client";

import React from "react";
import NextLink from "next/link";
import { Link, Button } from "@heroui/react";
import { FiBookOpen, FiArrowUp, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  // Smooth scroll helper function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Courses", href: "/courses" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const resources = [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-divider bg-background">
      {/* Top Section: Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <NextLink href="/" className="flex items-center gap-2 font-bold text-xl text-foreground group w-fit">
              <div className="bg-primary/10 p-1.5 rounded-xl text-primary transition-transform group-hover:scale-105">
                <FiBookOpen size={22} />
              </div>
              <span>Skill<span className="text-primary">Hub</span></span>
            </NextLink>
            <p className="text-sm text-foreground-500 max-w-xs leading-relaxed">
              Empowering developers and creators worldwide with top-tier, production-ready curriculum and interactive learning environments.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Github" className="text-foreground-500 hover:text-primary">
                <FaGithub size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="LinkedIn" className="text-foreground-500 hover:text-primary">
                <FaLinkedin size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Twitter" className="text-foreground-500 hover:text-primary">
                <FaTwitter size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Facebook" className="text-foreground-500 hover:text-primary">
                <FaFacebook size={16} />
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link as={NextLink} href={item.href} className="text-sm text-foreground-500 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link as={NextLink} href={item.href} className="text-sm text-foreground-500 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-foreground-500">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 text-primary shrink-0" size={16} />
                <span>Mirpur DOHS, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-primary shrink-0" size={16} />
                <span>+880 1322-901105</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-primary shrink-0" size={16} />
                <span>support@skillhub.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section: Copyright & Utilities */}
      <div className="border-t border-divider bg-content1/30">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} SkillHub Inc. All rights reserved.
          </p>
          
          {/* Back To Top Action */}
          <Button
            onClick={scrollToTop}
            variant="flat"
            radius="xl"
            size="sm"
            endContent={<FiArrowUp size={14} />}
            className="text-xs font-medium text-foreground-600 hover:text-primary bg-background hover:bg-content2 border border-divider transition-all"
          >
            Back To Top
          </Button>
        </div>
      </div>
    </footer>
  );
}