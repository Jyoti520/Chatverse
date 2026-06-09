import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import Avatar from "../../../common/Avatar";
import { useAuth } from "../../../../hooks/useAuth";

function ProfileSection() {
  const { loggeduser } = useAuth();
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex justify-between items-start gap-4 pt-2">
        <Avatar>
          {loggeduser ? loggeduser.username.charAt(0).toUpperCase() : "D"}
        </Avatar>
        {/* chnages have to be done   */}
        <div className="flex-1 space-y-2">
          <h1 className="text-lg font-medium p-1 text-slate-900 dark:text-slate-100">
            {loggeduser?.username?.charAt(0)?.toUpperCase() +
              loggeduser?.username?.slice(1) || "Deleted"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 w-full">
            {loggeduser?.email}
          </p>
        </div>
      </div>
    </SettingSection>
  );
}

export default ProfileSection;
