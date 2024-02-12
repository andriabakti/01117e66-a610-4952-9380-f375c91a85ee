"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isAuth: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BaseNavbar({ isAuth, setOpen }: Props) {
  return (
    <div className="navbar sticky top-0 z-10 h-[80px] bg-blue-500">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl font-bold text-gray-100">
          Link Shortener
        </a>
      </div>
      <div className="navbar-end mr-5">
        {!isAuth ? (
          <div>
            <Link
              href="/sign-up"
              className="btn rounded-lg border-none bg-white text-lg font-bold text-blue-700 hover:bg-gray-700 hover:text-white"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className="btn ml-5 rounded-lg border-none bg-white text-lg font-bold text-blue-700 hover:bg-gray-700 hover:text-white"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <button
            type="button"
            className="btn ml-5 rounded-lg border-none bg-white text-lg font-bold text-blue-500 hover:bg-gray-700 hover:text-white"
            onClick={() => setOpen(true)}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
