"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
// import LogoutButton from "../logout/logout";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav
      ref={navRef}
      className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">ReciPlease</Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 text-2xl focus:outline-none"
          aria-label="Toggle navigation">
          <FaBars />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-6 bg-white shadow-lg rounded-lg mt-4 w-auto z-90000">
          <ul className="flex flex-col items-start py-4 px-6 space-y-3">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600">
                About
              </Link>
            </li>

            {session && (
              <>
                <li>
                  <Link
                    href="/recipes"
                    className="text-gray-700 hover:text-blue-600">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register/survey"
                    className="text-gray-700 hover:text-blue-600">
                    Register survey
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ color: "red" }}
                    href=""
                    onClick={() => signOut({ callbackUrl: "/login" })}>
                    Sign out
                  </Link>
                </li>
              </>
            )}
            {!session && (
              <li>
                <Link
                  href="/login"
                  className="text-green-700 hover:text-blue-600">
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
