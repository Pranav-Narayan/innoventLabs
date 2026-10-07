import Link from "next/link";
import Image from "next/image";
import { navServices } from "@/app/lib/site-data";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";

const companyLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaXTwitter, label: "X (Twitter)", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      {/* soft glow accents */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-[24rem] rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-96 w-88 rounded-full bg-sky-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-white px-3 py-2 shadow-lg shadow-blue-500/10"
          >
            <Image
              src="/images/Logo.png"
              alt="InnoventLab logo"
              width={100}
              height={100}
              className="w-36"
            />
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            A software development company specialising in data engineering —
            pipelines, platforms and products that turn raw data into decisions.
          </p>

          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-linear-to-br hover:from-blue-600 hover:to-sky-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Services
          </h4>
          <ul className="mt-4 space-y-2.5">
            {navServices.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-sm text-white/65 transition-colors hover:text-sky-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/65 transition-colors hover:text-sky-400"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-sky-400" />
              <a
                href="mailto:hello@innoventlab.com"
                className="transition-colors hover:text-sky-400"
              >
                hello@innoventlab.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-sky-400" />
              <a
                href="tel:+919876543210"
                className="transition-colors hover:text-sky-400"
              >
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
              <span>InnoventLab, Tech Park, Kochi, Kerala, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} InnoventLab. All rights reserved.</p>
          <p>innoventlab.com — Data Engineering, Done Right.</p>
        </div>
      </div>
    </footer>
  );
}