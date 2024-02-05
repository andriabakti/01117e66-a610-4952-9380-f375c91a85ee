"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import userService from "../services/user.service";

const regisSchema = yup.object({
  username: yup
    .string()
    .required("Username should not be empty!")
    .min(3, "Username should be at least 3 character!"),
  email: yup
    .string()
    .required("Email should not be empty!")
    .email("Email format is not valid!")
    .matches(/@[^.]*\./, "Email format is not valid!"),
  password: yup
    .string()
    .required("Password should not be empty!")
    .min(6, "Password should be at least 6 character!"),
});

export type RegisFields = yup.InferType<typeof regisSchema>;

export default function RegisForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisFields>({
    mode: "onChange",
    resolver: yupResolver(regisSchema),
  });

  const togglePassword = () => {
    setShowPassword(showPassword ? false : true);
  };

  const handleRegister = async (values: RegisFields) => {
    setLoading(true);
    const response = await userService.regis(values);
    if (!response.error) {
      toast("Registration success!", { type: "success" });
      localStorage.setItem("token", response.result.accessToken);
      setLoading(false);
      reset();
      router.push("/shorten");
    } else {
      toast(response.message, { type: "error" });
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="flex flex-col rounded-b-xl bg-gray-100 px-5 py-10">
      <form
        className="flex flex-col justify-between px-5 text-left"
        onSubmit={handleSubmit((data: RegisFields) => handleRegister(data))}
      >
        <div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 font-semibold text-blue-700 hover:cursor-pointer"
            >
              Username
            </label>
            <input
              {...register("username")}
              id="username"
              type="text"
              placeholder="March Hare"
              className="input w-full rounded-md border-2 border-solid border-slate-300 bg-white text-black hover:border-blue-500 focus:border-solid focus:border-blue-500 focus:outline-none"
              autoComplete="off"
            />
            {errors?.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors?.username?.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 font-semibold text-blue-700 hover:cursor-pointer"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="input w-full rounded-md border-2 border-solid border-slate-300 bg-white text-black hover:border-blue-500 focus:border-solid focus:border-blue-500 focus:outline-none"
              placeholder="march.hare@gmail.com"
              autoComplete="off"
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-semibold text-blue-700 hover:cursor-pointer"
            >
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                {...register("password")}
                id="password"
                type={!showPassword ? "password" : "text"}
                className="input w-full rounded-md border-2 border-solid border-slate-300 bg-white text-black hover:border-blue-500 focus:border-solid focus:border-blue-500 focus:outline-none"
                placeholder="4GL4yu8RE:E"
                autoComplete="off"
              />
              <i
                className="absolute right-[15px] hover:cursor-pointer"
                onClick={togglePassword}
              >
                {!showPassword ? (
                  <Eye className="stroke-blue-700 hover:stroke-blue-500" />
                ) : (
                  <EyeOff className="stroke-blue-700 hover:stroke-blue-500" />
                )}
              </i>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="btn btn-wide mb-4 border-none bg-blue-700 text-white hover:bg-blue-500 disabled:font-bold disabled:text-white"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "SIGN UP"
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        <p>
          <span className="font-medium text-gray-700">
            Already have account?
          </span>
          <Link href="/sign-in">
            <span className="font-bold text-blue-700 hover:cursor-pointer hover:text-blue-500">
              {" "}
              SIGN IN
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
