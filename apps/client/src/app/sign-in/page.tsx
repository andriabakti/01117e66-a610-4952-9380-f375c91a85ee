"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import isProtected from "../../components/commons/protected-page";
import LoginForm from "../../components/users/user-login.form";

function LoginPage() {
  return (
    <div className={`flex h-screen items-center justify-center bg-sky-300`}>
      <div className="md:w-[500px]">
        <div className="relative flex flex-col items-center justify-center rounded-t-xl bg-blue-700 py-5">
          <Link
            href="/shorten"
            className="group absolute left-[15px] flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-slate-700"
          >
            <ArrowLeft className=" stroke-blue-700 stroke-[3px] group-hover:stroke-white " />
          </Link>
          <h2 className="text-2xl font-bold text-white">LOGIN</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default isProtected(LoginPage);
