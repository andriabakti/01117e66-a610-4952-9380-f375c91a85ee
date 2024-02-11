import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import { LinkPageInfo } from "../../app/shorten/page";

export type LinkField = {
  id: string;
  shortUrl: string;
  longUrl: string;
  visitCount: number;
  createdAt: Date;
};

type Props = {
  links: Array<LinkField>;
  isLogin: boolean;
  listCount: number;
  page: LinkPageInfo;
  pageHandler: Dispatch<SetStateAction<any>>;
};

export default function LinkList({
  links,
  isLogin,
  listCount,
  page,
  pageHandler,
}: Props) {
  const changePageUp = () => {
    const lastIndex =
      page.lastIndex + 5 < listCount ? page.lastIndex + 5 : listCount;
    pageHandler({
      limit: page.limit,
      skip: page.skip + 5,
      current: page.current + 1,
      lastPage: Math.ceil(listCount / 5),
      startIndex: page.startIndex + 5,
      lastIndex: lastIndex,
    });
  };

  const changePageDown = () => {
    const lastIndex =
      page.startIndex - 5 < page.lastIndex
        ? page.startIndex - 1
        : page.startIndex - 5;
    pageHandler({
      limit: page.limit,
      skip: page.skip - 5,
      current: page.current - 1,
      lastPage: Math.ceil(listCount / 5),
      startIndex: page.startIndex - 5,
      lastIndex: lastIndex,
    });
  };

  return (
    <div className="h-[calc(100%-80px)] w-full">
      <div className="container mb-20 mt-10 h-auto overflow-x-hidden rounded-lg rounded-b-lg bg-white">
        <div className="bg-blue-500 py-5 text-center text-xl font-bold text-white">
          List of Shortened Link
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Create Date</th>
              <th>Shortened URL</th>
              <th>Original URL</th>
              <th>Visit Count</th>
            </tr>
          </thead>
          {links.length ? (
            links.map((el: any, i: number) => (
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
                  {!isLogin ? (
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
        {isLogin && (
          <div className="m-5 flex items-center justify-between">
            <div className="font-bold text-blue-500">
              Showing {page.startIndex} to {page.lastIndex} of {listCount}
            </div>
            <div>
              <div className="join">
                <button
                  className="btn join-item bg-gray-200 text-xl font-bold text-blue-700 hover:bg-blue-500 hover:text-white"
                  onClick={() => changePageDown()}
                  disabled={page.current === 1}
                >
                  {"<"}
                </button>
                <button className="btn join-item bg-gray-200 text-blue-700 hover:cursor-default hover:border-gray-200 hover:bg-gray-200 ">
                  Page {page.current}
                </button>
                <button
                  className="btn join-item bg-gray-200 text-xl font-bold text-blue-700 hover:bg-blue-500 hover:text-white"
                  onClick={() => changePageUp()}
                  disabled={
                    page.current === page.lastPage || page.current === null
                  }
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
