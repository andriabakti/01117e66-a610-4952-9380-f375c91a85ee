"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import linkService from "../../services/link.service";
import { Tooltip } from "react-tooltip";

type Props = {
  isLogin: boolean;
  handleList: Function;
};

const shortenSchema = yup.object({
  originalUrl: yup.string().url("URL format is not valid!"),
});

export type ShortenField = yup.InferType<typeof shortenSchema>;

export default function LikShortenerForm({ isLogin, handleList }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [copy, setCopy] = useState("");
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid },
  } = useForm<ShortenField>({
    mode: "onChange",
    resolver: yupResolver(shortenSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const handleShorten = async (value: ShortenField) => {
    setLoading(true);
    const response = await linkService.shorten(value);
    if (!response.error) {
      setCopy(response.result.shortUrl);
      setLoading(false);
      handleList();
    } else {
      toast.error(response.message);
      setLoading(false);
      resetField("originalUrl");
    }
    handleList();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white py-10">
      <div className="w-[50%]">
        {!isLogin ? (
          <p className="mb-5 text-center text-2xl font-bold text-gray-700">
            Please <span className="text-blue-500">Sign In</span> to Shorten
            Your Link
          </p>
        ) : (
          <p className="mb-5 text-center text-3xl font-bold text-gray-700">
            Shorten your URL
          </p>
        )}
        <div className="relative">
          <input
            {...register("originalUrl")}
            type="text"
            className="input input-bordered input-md w-full border-4 border-solid border-slate-300 bg-gray-200 font-medium text-black placeholder-gray-400 hover:border-blue-500 focus:border-solid focus:border-blue-500 focus:outline-none disabled:cursor-default"
            placeholder="Paste your link here"
            disabled={!isLogin}
          />
          <button
            type="button"
            className="btn absolute right-0 w-20 rounded-l-none border-2 border-blue-500 bg-blue-500 text-lg font-bold text-white hover:border-gray-700 hover:bg-gray-700 disabled:font-bold disabled:text-white"
            onClick={() => resetField("originalUrl")}
          >
            Clear
          </button>
        </div>
        {errors?.originalUrl && (
          <p className="mt-1 text-sm text-red-600">
            {errors?.originalUrl?.message}
          </p>
        )}
        <div className="relative mt-5">
          <input
            id="result"
            type="text"
            className="input input-bordered input-md w-full disabled:cursor-default disabled:bg-gray-200 disabled:font-semibold disabled:placeholder-gray-400"
            placeholder={
              copy.length ? copy : "Your shortened link will be shown here"
            }
            disabled
          />
          <CopyToClipboard text={copy}>
            <button
              type="button"
              className="copy_button btn absolute right-0 w-20 rounded-l-none border-2 border-blue-500 bg-blue-500 text-lg font-bold text-white hover:border-gray-700 hover:bg-gray-700 disabled:font-bold disabled:text-white"
              disabled={!copy.length ? true : false}
            >
              Copy
            </button>
          </CopyToClipboard>
          <Tooltip
            anchorSelect=".copy_button"
            openOnClick={true}
            place="top-start"
            delayHide={1000}
          >
            Copied to Clipboard
          </Tooltip>
        </div>
      </div>
      <div className="mt-5 flex w-[50%] flex-col items-center">
        <button
          className="btn btn-wide mt-5 bg-blue-500 text-xl text-white hover:bg-blue-500  disabled:font-bold disabled:text-white"
          onClick={handleSubmit((data: ShortenField) => handleShorten(data))}
          disabled={!isLogin || !isDirty || !isValid || isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Shorten"
          )}
        </button>
      </div>
    </div>
  );
}
