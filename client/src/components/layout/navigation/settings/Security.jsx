import { useState } from "react";
import ToggleSwitch from "../../../common/ToggleSwitch";
import SettingSection from "./SettingSection";
import { Lock } from "lucide-react";

function Security() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <SettingSection icon={Lock} title="Security">
      <ToggleSwitch
        label={"Two Factor Authentication"}
        isEnabled={twoFactor}
        onToggle={() => setTwoFactor(!twoFactor)}
      />

      <div className="mt-4">
        <button className="border-2 border-gray-600/20 px-6 py-2 text-gray-700 dark:text-gray-100 hover:text-gray-100 hover:bg-indigo-500 hover:outline-2 w-full font-medium  transition duration-300 rounded sm:w-auto text-sm">
          Change Password
        </button>
      </div>
    </SettingSection>
  );
}

export default Security;
