import { useEffect, useMemo, useState } from "react";
import Users from "./Users";
import { Search } from "lucide-react";
import Loader from "../../common/Loader";
import Input from "../../common/Input";
import { useChat } from "../../../hooks/useChat";
import { useUser } from "../../../hooks/useUser";

function Contacts() {
  const { createChat, chatLoad, chatErr } = useChat();
  const { fetchUsers, users, loading, apiErr } = useUser();
  const [search, setSearch] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  // fetch users
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const filteredUsers = useMemo(() => {
    if (!search.trim()) {
      return users;
    }
    return users.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  return (
    <>
      {/* Search input */}
      <div className="w-full flex flex-col transition-all duration-300 cursor-pointer animate-fadein overflow-hidden py-2">
        <div className="relative pb-3 pt-4 px-4">
          <Input
            className="bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 backdrop-blur-xl border-2 border-indigo-200/70 dark:border-indigo-400/15 px-5 py-4 pr-12 rounded-2xl focus:ring-2 focus:border-indigo-400 dark:focus:border-indigo-500/30 focus:ring-indigo-500/10"
            placeholder="Search here..."
            value={search}
            onChange={handleInputChange}
            aria-label="Search users"
          />
          <Search
            className={`absolute top-[52%] -translate-y-1/2 right-8 text-indigo-400/80 dark:text-indigo-300/50`}
            size={20}
          />
        </div>

        {/* Search results */}
        <div className="relative flex flex-col overflow-y-auto scroll-hide pb-4">
          {loading ? (
            <Loader textColor="text-indigo-500" />
          ) : (
            filteredUsers?.map((user) => (
              <Users
                key={user._id}
                userName={user.username}
                handleChat={() => {
                  createChat(user._id);
                }}
              />
            ))
          )}
          {/* chat loader overlay */}
          {chatLoad && (
            <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/20 dark:bg-black/20 transition z-20">
              <p className="text-sm text-indigo-500 dark:text-indigo-300 font-medium">
                Creating chat...
              </p>
            </div>
          )}
          {/* Errors */}
          {apiErr && (
            <div
              className="mx-4 px-4 py-3 mt-4 text-sm text-center border border-red-300/30 bg-red-500/5 text-red-500 dark:text-red-300 font-medium backdrop-blur-xl rounded-2xl"
              aria-live="assertive"
            >
              {apiErr}
            </div>
          )}
          {chatErr && (
            <div
              className="mx-4 px-4 py-3 mt-4 text-sm text-center border border-red-300/30 bg-red-500/5 text-red-500 dark:text-red-300 font-medium backdrop-blur-xl rounded-2xl"
              aria-live="assertive"
            >
              {chatErr}
            </div>
          )}

          {!loading && filteredUsers.length === 0 && !apiErr && (
            <p className="mt-6 text-sm text-center text-slate-500 dark:text-slate-400">
              No users found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Contacts;
