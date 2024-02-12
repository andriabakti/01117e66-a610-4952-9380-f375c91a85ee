"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LikShortenerForm from "../../components/links/link-shortener.form";
import LinkList, { LinkField } from "../../components/links/link-list";
import LinkStats from "../../components/links/link.stats";
import LogoutModal from "../../components/logout.modal";
import Navbar from "../../components/navbar";
import linkService from "../../services/link.service";

export type LinkList = {
  links: Array<LinkField>;
  totalLink: number;
  totalVisit: number;
};

export type LinkPageInfo = {
  limit: number;
  skip: number;
  current: number;
  lastPage: number;
  startIndex: number;
  lastIndex: number;
};

export default function ShortenPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [list, setList] = useState<LinkList>({
    links: [],
    totalLink: 0,
    totalVisit: 0,
  });
  const [page, setPage] = useState<LinkPageInfo>({
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
      setIsLogin(true);
      handleList();
    }
  }, [handleList]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar isLogin={isLogin} setShowModal={setModalOpen} />
      <LikShortenerForm isLogin={isLogin} handleList={handleList} />
      <LinkStats totalLink={list.totalLink} totalVisit={list.totalVisit} />
      <LinkList
        isLogin={isLogin}
        links={list.links}
        page={page}
        listCount={list.totalLink}
        pageHandler={setPage}
      />
      <LogoutModal
        showModal={isModalOpen}
        setModalOpen={setModalOpen}
        setLogin={setIsLogin}
      />
    </div>
  );
}
