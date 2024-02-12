"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseNavbar from "../../components/commons/base-navbar";
import LinkForm from "../../components/links/link-form.section";
import LinkList, { ILinkField } from "../../components/links/link-list.section";
import LinkStats from "../../components/links/link-stats.section";
import LogoutModal from "../../components/users/user-logout.modal";
import linkService from "../../services/link.service";

export type ILinkList = {
  links: Array<ILinkField>;
  totalLink: number;
  totalVisit: number;
};

export type IListPage = {
  limit: number;
  skip: number;
  current: number;
  lastPage: number;
  startIndex: number;
  lastIndex: number;
};

export default function ShortenPage() {
  const [isLogin, setLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [list, setList] = useState<ILinkList>({
    links: [],
    totalLink: 0,
    totalVisit: 0,
  });
  const [page, setPage] = useState<IListPage>({
    limit: 5,
    skip: 0,
    current: 1,
    lastPage: 0,
    startIndex: 1,
    lastIndex: 5,
  });

  const handleList = useCallback(async () => {
    const response = await linkService.list(page.skip, page.limit);
    if (!response?.error) {
      setList({
        links: response.result.links,
        totalLink: response.result.totalLink,
        totalVisit: response.result.totalVisit,
      });
    } else {
      toast.error(response.message);
    }
  }, [page]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLogin(true);
      handleList();
    }
  }, [handleList]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <BaseNavbar isAuth={isLogin} setOpen={setModal} />
      <LinkForm isAuth={isLogin} setList={handleList} />
      <LinkStats totalLink={list.totalLink} totalVisit={list.totalVisit} />
      <LinkList
        isAuth={isLogin}
        totalLink={list.totalLink}
        listLink={list.links}
        listPage={page}
        setPageInfo={setPage}
      />
      <LogoutModal isOpen={modal} setOpen={setModal} setAuth={setLogin} />
    </div>
  );
}
