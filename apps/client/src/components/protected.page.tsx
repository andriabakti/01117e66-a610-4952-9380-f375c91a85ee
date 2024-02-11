"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function isProtected<T>(Component: React.ComponentType<T>) {
  return function IsAuth(props: T) {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        redirect("/shorten");
      }
    });

    return <Component {...props} />;
  };
}
