import { useEffect, useMemo, useState } from "react";
import Users from "./Users";
import { Search } from "lucide-react";
import Loader from "../../common/Loader";
import Input from "../../common/Input";
import { useChat } from "../../../hooks/useChat";
import { useUser } from "../../../hooks/useUser";
import { filterUsers } from "../../../utils/search";

function Contacts({search}) {
  const { createChat, chatLoad, chatErr } = useChat();
  const { fetchUsers, users, loading, apiErr } = useUser();

  // fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return filterUsers(users, search);
  }, [users, search]);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto scroll-hide">
      {loading && (
        <div className="flex flex-1 items-center justify-center mt-10">
          <Loader textColor="text-indigo-500" />
        </div>
      )}

      {!loading &&
        filteredUsers?.map((user) => (
          <Users
            key={user._id}
            userName={user.username}
            handleChat={() => {
              createChat(user._id);
            }}
          />
        ))}

      {!loading && filteredUsers.length === 0 && !apiErr && (
        <p className="mt-6 text-sm text-center text-slate-400 dark:text-slate-500">
          {search ? `No results for "${search}"` : "No contacts found"}
        </p>
      )}

      {/* Errors */}
      {apiErr && (
        <div
          className="mx-4 px-4 py-3 mt-4 text-sm text-center border border-red-500/[0.04] bg-red-50  text-red-500 dark:text-red-300 font-medium backdrop-blur-xl rounded-xl"
          aria-live="assertive"
        >
          <p className="text-xs font-medium text-red-500 dark:text-red-400 text-center">
            {apiErr}
          </p>
        </div>
      )}

      {chatErr && (
        <div
          className="mx-4 px-4 py-3 mt-4 text-sm text-center border border-red-300/30 bg-red-500/5 text-red-500 dark:text-red-300 font-medium backdrop-blur-xl rounded-2xl"
          aria-live="assertive"
        >
          <p className="text-xs font-medium text-red-500 dark:text-red-400 text-center">
            {chatErr}
          </p>
        </div>
      )}

      {/* chat loader overlay */}
      {chatLoad && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/20 dark:bg-black/20 z-20">
          <p className="text-sm font-medium text-indigo-500 dark:text-indigo-300">
            Creating chat...
          </p>
        </div>
      )}
    </div>
  );
}

export default Contacts;
