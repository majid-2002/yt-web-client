"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SignIn from "./SignIn";
import { onAuthStateChangedHelper } from "@/utils/firebase";
import { User } from "firebase/auth";
import Upload from "./Upload";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  });

  return (
    <nav
      className="flex justify-between items-center h-20 bg-red-600 text-white relative shadow-sm font-bold text-2xl px-5"
      role="navigation"
    >
      <Link href="/">Youtube Clone</Link>
      <div className="flex">{user && <Upload />}</div>
      <div>
        <SignIn user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
