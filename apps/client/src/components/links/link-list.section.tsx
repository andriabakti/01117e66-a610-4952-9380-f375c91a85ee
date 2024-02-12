"use client";

import { IListPage } from "@/app/shorten/page";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";

export type ILinkField = {
  id: string;
  shortUrl: string;
  longUrl: string;
  visitCount: number;
  createdAt: Date;
};

type Props = {
  isAuth: boolean;
  totalLink: number;
  listLink: Array<ILinkField>;
  listPage: IListPage;
  setPageInfo: Dispatch<SetStateAction<IListPage>>;
};

export default function LinkList({
  isAuth,
  totalLink,
  listLink,
  listPage,
  setPageInfo,
}: Props) {
  const changePageUp = () => {
    const lastIndex =
      listPage.lastIndex + 5 < totalLink ? listPage.lastIndex + 5 : totalLink;
    setPageInfo({
      limit: listPage.limit,
      skip: listPage.skip + 5,
      current: listPage.current + 1,
      lastPage: Math.ceil(totalLink / 5),
      startIndex: listPage.startIndex + 5,
      lastIndex: lastIndex,
    });
  };

  const changePageDown = () => {
    const lastIndex =
      listPage.startIndex - 5 < listPage.lastIndex
        ? listPage.startIndex - 1
        : listPage.startIndex - 5;
    setPageInfo({
      limit: listPage.limit,
      skip: listPage.skip - 5,
      current: listPage.current - 1,
      lastPage: Math.ceil(totalLink / 5),
      startIndex: listPage.startIndex - 5,
      lastIndex: lastIndex,
    });
  };

  return (
    <div className="container mb-20 ">
      <div className="mt-10  rounded-t-lg bg-blue-500 py-5 text-center text-xl font-bold text-white">
        List of Shortened Link
      </div>
      <div className="h-auto overflow-x-auto rounded-b-lg bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Create Date</th>
              <th>Shortened URL</th>
              <th>Original URL</th>
              <th>Visit Count</th>
            </tr>
          </thead>
          {listLink.length ? (
            listLink.map((el: any, i: number) => (
              <tbody key={el.id}>
                <tr className="hover:bg-blue-200">
                  <td>{format(el.createdAt, "yyyy MMM dd HH:mm")}</td>
                  <td>
                    {el.shortUrl}
                    <CopyToClipboard text={el.shortUrl}>
                      <span className="copy_link ml-3 cursor-pointer font-bold text-blue-700">
                        Copy
                      </span>
                    </CopyToClipboard>
                    <Tooltip
                      anchorSelect=".copy_link"
                      delayHide={1000}
                      openOnClick={true}
                      place="top-start"
                    >
                      Copied to Clipboard
                    </Tooltip>
                  </td>
                  <td>{el.longUrl}</td>
                  <td className="text-center font-bold text-blue-700">
                    {el.visitCount}
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td
                  className="h-60 bg-gray-200 text-center text-2xl font-bold"
                  colSpan={8}
                >
                  {!isAuth ? (
                    <>
                      <span className="text-blue-500">Sign In</span> to See This
                      Section
                    </>
                  ) : (
                    "No Data"
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {isAuth && totalLink !== 0 && (
        <div className="flex items-center justify-between rounded-b-lg bg-white p-5 ">
          <div className="font-bold text-blue-500">
            Showing {listPage.startIndex} to {listPage.lastIndex} of {totalLink}
          </div>
          {totalLink > 5 && (
            <div>
              <div className="join">
                <button
                  className="btn join-item bg-gray-200 text-xl font-bold text-blue-700 hover:bg-blue-500 hover:text-white"
                  onClick={() => changePageDown()}
                  disabled={listPage.current === 1}
                >
                  {"<"}
                </button>
                <button className="btn join-item  bg-gray-200 text-blue-700 hover:cursor-default hover:bg-gray-200 ">
                  Page {listPage.current}
                </button>
                <button
                  className="btn join-item bg-gray-200 text-xl font-bold text-blue-700 hover:bg-blue-500 hover:text-white"
                  onClick={() => changePageUp()}
                  disabled={
                    listPage.current === listPage.lastPage ||
                    listPage.current === null
                  }
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
