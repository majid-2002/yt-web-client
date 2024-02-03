"use client";

import { signInWithGoogle, signOut } from "@/utils/firebase";
import { User } from "firebase/auth";
import { Fragment } from "react";
import React from "react";

const SignIn = ({ user }: { user: User | null }) => {
  return (
    <Fragment>
      {user ? (
        <button
          onClick={signOut}
          className="bg-blue-500 bg-opacity-30 border-blue-500 border text-sm font-normal text-white p-2 px-3 rounded-3xl hover:bg-blue-500/40 hover:text-white"
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-blue-500 bg-opacity-30 border-blue-500 border text-sm font-normal text-white p-2 px-3 rounded-3xl hover:bg-blue-500/40 hover:text-white"
          onClick={signInWithGoogle}
        >
          Sign In
        </button>
      )}
    </Fragment>
  );
};

export default SignIn;
