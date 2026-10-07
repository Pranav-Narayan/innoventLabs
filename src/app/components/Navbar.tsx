"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navServices, navProjects } from "@/app/lib/site-data";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

const plainLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src="/images/Logo.png"
        alt="InnoventLab logo"
        width={100}
        height={100}
        className="w-40"
      />
    </Link>
  );
}

function Dropdown({
  label,
  items,
  testId,
}: {
  label: string;
  items: {
    title: string;
    href: string;
    short: string;
  }[];
  testId: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      data-testid={testId}
    >
      <button
        type="button"
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-lg font-medium transition-colors hover:bg-blue-50 hover:text-blue-600 ${
          open ? "bg-blue-50 text-blue-600" : "text-slate-700"
        }`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-88 -translate-x-1/2 pt-3 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-500/10">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/30">
                <ArrowRight className="h-4 w-4" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                  {item.short}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-lg font-medium transition-colors hover:bg-blue-50 hover:text-blue-600 ${
      isActive(href) ? "bg-blue-50 font-semibold text-blue-600" : "text-slate-700"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b py-2 transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>

          <Dropdown label="Services" items={navServices} testId="nav-services" />
          {/* <Dropdown label="Projects" items={navProjects} testId="nav-projects" /> */}

          <Link href="/about" className={linkClass("/about")}>
            Blogs
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            Careers
          </Link>

          {/* Contact: same style as hero "Start a Project" */}
          <Link
            href="/contact"
            className={`group ml-3 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 px-6 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              isActive("/contact") ? "ring-2 ring-blue-300 ring-offset-2" : ""
            }`}
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all hover:border-blue-300 hover:shadow-md md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-blue-50 ${
                  isActive(link.href)
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-slate-900"
                }`}
              >
                {link.title}
              </Link>
            ))}

            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Services
            </p>

            {navServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm hover:bg-blue-50 ${
                  isActive(service.href)
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-slate-700"
                }`}
              >
                {service.title}
              </Link>
            ))}

            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Projects
            </p>

            {navProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm hover:bg-blue-50 ${
                  isActive(project.href)
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-slate-700"
                }`}
              >
                {project.title}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="group mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/35"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}