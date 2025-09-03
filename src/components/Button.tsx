// components/Button.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type ButtonProps = {
  label: string;
  href: string; // can be an external link, internal route, or section id (#section)
  variant?: "fill" | "outline";
};

const Button: React.FC<ButtonProps> = ({ label, href, variant = "fill" }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-2 rounded-full font-medium transition-colors duration-200";

  const variants = {
    fill: "bg-black text-white hover:bg-gray-800",
    outline: "border border-black text-black hover:bg-gray-100",
  };

  // Check if it's a section scroll (#id)
  const isSection = href.startsWith("#");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSection) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      {href.startsWith("http") || href.startsWith("/") ? (
        // Next.js link for internal/external navigation
        <Link
          href={href}
          className={`${baseStyles} ${variants[variant]}`}
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel={href.startsWith("http") ? "noopener noreferrer" : ""}
        >
          {label}
        </Link>
      ) : (
        // Smooth scroll for section links
        <a
          href={href}
          onClick={handleScroll}
          className={`${baseStyles} ${variants[variant]}`}
        >
          {label}
        </a>
      )}
    </motion.div>
  );
};

export default Button;
