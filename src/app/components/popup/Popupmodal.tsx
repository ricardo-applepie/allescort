"use client";

import { postData } from "@/utils/utils";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useState as useReactState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

type PopUpType = "addItem" | "addBoard" | "addCollection";

interface PopUpModalProps {
  btnTitle: string;
  title: string;
  type: PopUpType;
  fullWidth?: boolean;
}

const PopUpModal = (props : PopUpModalProps) => {

  const [boardName, setBoardName] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { btnTitle, title } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const authToken = typeof window !== 'undefined' && window.localStorage.getItem("authToken");

    switch (props.type) {
      case "addBoard":
        if (!authToken) return;
        const boards = await postData("/api/v1/boards", { boardName: boardName } , authToken);
        break;
      case "addCollection":
        if (!authToken) return;
        const groups = await postData("/api/v1/groups", { groupName: boardName, boardId: id }, authToken);

        break;
      default:
        // Execute code if no case matches
        break;
    }
    setBoardName("")
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setBoardName(value);
  };

  useEffect(() => {
    setIsClient(true); // Mark as true when the component is mounted on the client
  }, []);

  if (!isClient) return null; // Avoid rendering on server-side

  return (
    <Popup
      trigger={
        <button className={`bg-black hover:bg-black-500 text-white py-2 px-3 rounded ${props.fullWidth ? 'w-full' : ''}`}>
          <span>{btnTitle}</span>
        </button>
      }
      modal
      closeOnDocumentClick
    >
      {((close: () => void) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <form
            className="px-5 py-5"
            onSubmit={(event) => {
              handleSubmit(event);
              close();
            }}
          >
            <div className="header">{title}</div>
            <input
              className="shadow my-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={boardName}
              placeholder={title}
              onChange={handleChange}
            />
            <div className="actions">
              <button className="bg-black text-white font-bold py-2 px-4 rounded w-full" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )) as any}
    </Popup>
  );
};

export default PopUpModal;
