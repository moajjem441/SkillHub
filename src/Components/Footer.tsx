"use client";

import NextLink from "next/link";
import { Link, Button } from "@heroui/react";
import { FiBookOpen, FiArrowUp, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { data: session } = authClient.useSession();

  // 🔥 Role-based Quick Links (My Courses + Admin Links)
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Courses", href: "/courses" },
    // 👇 শুধুমাত্র সাধারণ ইউজারদের জন্য My Courses
    ...(session && session.user?.role !== "admin"
      ? [{ label: "My Courses", href: "/my-courses" }]
      : []),
    // 👇 শুধুমাত্র অ্যাডমিনদের জন্য
    ...(session?.user?.role === "admin"
      ? [
          { label: "Add Course", href: "/add-course" },
          { label: "Manage Courses", href: "/courses/manage" },
        ]
      : []),
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
    <footer className="w-full border-t border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <NextLink href="/" className="flex items-center gap-2 font-bold text-xl text-white group w-fit">
              <div className="bg-blue-500/20 p-1.5 rounded-xl text-blue-400 transition-transform group-hover:scale-105">
                <FiBookOpen size={22} />
              </div>
              <span>Skill<span className="text-blue-400">Hub</span></span>
            </NextLink>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Empowering developers and creators worldwide with top-tier, production-ready curriculum and interactive learning environments.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Github" className="text-slate-400 hover:text-blue-400 transition-colors bg-transparent border border-slate-700/60 hover:border-blue-500/50">
                <FaGithub size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="LinkedIn" className="text-slate-400 hover:text-blue-400 transition-colors bg-transparent border border-slate-700/60 hover:border-blue-500/50">
                <FaLinkedin size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Twitter" className="text-slate-400 hover:text-blue-400 transition-colors bg-transparent border border-slate-700/60 hover:border-blue-500/50">
                <FaTwitter size={16} />
              </Button>
              <Button isIconOnly variant="flat" radius="lg" size="sm" aria-label="Facebook" className="text-slate-400 hover:text-blue-400 transition-colors bg-transparent border border-slate-700/60 hover:border-blue-500/50">
                <FaFacebook size={16} />
              </Button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link as={NextLink} href={item.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link as={NextLink} href={item.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 text-blue-400 shrink-0" size={16} />
                <span>Mirpur DOHS, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-blue-400 shrink-0" size={16} />
                <span>+880 1322-901105</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-blue-400 shrink-0" size={16} />
                <span>support@skillhub.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-700/60 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} SkillHub Inc. All rights reserved.
          </p>
          <Button
            onClick={scrollToTop}
            variant="flat"
            radius="xl"
            size="sm"
            endContent={<FiArrowUp size={14} />}
            className="text-xs font-medium text-slate-400 hover:text-blue-400 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 transition-all"
          >
            Back To Top
          </Button>
        </div>
      </div>
    </footer>
  );
}