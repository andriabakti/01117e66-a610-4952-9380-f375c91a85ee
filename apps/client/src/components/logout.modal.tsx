"use client";

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useLayoutEffect,
  useRef,
} from "react";

type Props = {
  showModal: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function LogoutModal({
  showModal,
  setLogin,
  setModalOpen,
}: Props) {
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    if (!modalRef.current) return null;
    showModal ? modalRef.current.showModal() : modalRef.current.close();
  }, [showModal]);

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setModalOpen(false);
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("access_token");
    return setLogin(false);
  };

  return (
    <dialog
      ref={modalRef}
      id="logout_modal"
      className="modal"
      onClick={() => setModalOpen(false)}
      onKeyDown={(e: KeyboardEvent) => handleEsc(e)}
    >
      <div className="modal-box overflow-x-hidden md:w-[40%] lg:w-[30%]">
        <h3 className="pb-10 text-center text-xl font-bold">
          Are you sure want to logout?
        </h3>
        <form
          method="dialog"
          className="modal-backdrop flex justify-evenly text-blue-700"
        >
          <button
            className="btn right-0 w-40 border-2 border-red-500 bg-red-500 font-bold text-white hover:border-gray-700 hover:bg-gray-700 disabled:font-bold disabled:text-white"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn right-0 w-40 border-2 border-blue-500 bg-blue-500 font-bold text-white hover:border-gray-700 hover:bg-gray-700 disabled:font-bold disabled:text-white"
            onClick={() => confirmLogout()}
          >
            Confirm
          </button>
        </form>
      </div>
    </dialog>
  );
}
