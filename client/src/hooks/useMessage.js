import { useContext } from "react";
import { MsgContext } from "../context/MsgProvider";

export const useMessage = () => {
  const context = useContext(MsgContext);
  if (!context) throw new Error("useMsg must be used inside MsgProvider");
  return context;
};
