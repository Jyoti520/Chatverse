import Avatar from "../../common/Avatar"
function Users({ userName, handleChat }) {
  return (
    <div
      className="relative flex justify-start items-center gap-4 group px-4 py-3 mx-2 my-1 hover:bg-slate-100 dark:hover:bg-white/[0.03] transition-all duration-300 cursor-pointer animate-slidein rounded-2xl"
      onClick={handleChat} role="button"
    >
      <Avatar>
        {userName?.charAt(0).toUpperCase()}
      </Avatar>
      <h2 className="text-base text-slate-700 dark:text-slate-200 truncate">
        {userName.charAt(0).toUpperCase() + userName.slice(1)}
      </h2>
    </div>
  );
}


export default Users;


