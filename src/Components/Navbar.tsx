"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Link, Button } from "@heroui/react";
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsMenuOpen(false);
          router.push("/login");
        },
      },
    });
  };

  // 🔥 Role-based Navigation Items
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Explore Courses", href: "/courses" },
    ];

    // 👇 শুধুমাত্র অ্যাডমিনদের জন্য অ্যাডমিন অপশন
    const authItems =
      session && session.user?.role === "admin"
        ? [
            { label: "Add Course", href: "/add-course" },
            { label: "Manage Courses", href: "/courses/manage" },
          ]
        : [];

    const endItems = [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ];

    return [...baseItems, ...authItems, ...endItems];
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-100 sm:hidden focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <NextLink href="/" className="flex items-center gap-2 font-bold text-xl text-white group">
            <div className="bg-blue-500/20 p-1.5 rounded-xl text-blue-400 transition-transform group-hover:scale-105">
              <FiBookOpen size={22} />
            </div>
            <span>Skill<span className="text-blue-400">Hub</span></span>
          </NextLink>
        </div>

        {/* CENTER: DESKTOP NAV */}
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
                      ? "text-blue-400 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: AUTH ACTIONS */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:inline text-sm font-medium text-slate-200 max-w-[100px] truncate">
                  {session.user.name}
                </span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="light"
                radius="xl"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => router.push("/login")}
                variant="light"
                radius="xl"
                className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/register")}
                color="primary"
                variant="solid"
                radius="xl"
                className="text-sm font-semibold shadow-lg shadow-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none transition-all"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-slate-700/60 bg-slate-900/90 backdrop-blur-xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
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
                      isActive ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-4 border-t border-slate-700/60 flex flex-col gap-2">
            {!isPending && session ? (
              <>
                <div className="flex items-center gap-2 px-2 py-1">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-200">{session.user.name}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="flat"
                  radius="xl"
                  className="w-full font-medium text-slate-300 border border-slate-700/60 bg-slate-800/60 hover:bg-slate-700/60 transition-colors"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={NextLink}
                  href="/login"
                  variant="flat"
                  radius="xl"
                  className="w-full font-medium text-slate-300 border border-slate-700/60 bg-slate-800/60 hover:bg-slate-700/60 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
                <Button
                  as={NextLink}
                  href="/register"
                  color="primary"
                  radius="xl"
                  className="w-full font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none shadow-lg shadow-blue-500/30 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}