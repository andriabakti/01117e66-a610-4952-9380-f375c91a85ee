"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function isProtected<T>(Component: React.ComponentType<T>) {
  return function Page(props: T) {
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        redirect("/shorten");
      }
    });

    return <Component {...props} />;
  };
}
