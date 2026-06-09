import { useState } from "react";
import { Bell } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "../../../common/ToggleSwitch";
function Notification() {
  const [notification, setNotification] = useState({
    email: true,
    push: false,
    sms: true,
  });
  return (
    <SettingSection icon={Bell} title={"Notifications"}>
      <div className="flex flex-col space-y-3">
        <ToggleSwitch
          label={"Push notification"}
          isEnabled={notification.push}
          onToggle={() =>
            setNotification({ ...notification, push: !notification.push })
          }
        />
        <ToggleSwitch
          label={"Email notification"}
          isEnabled={notification.email}
          onToggle={() =>
            setNotification({ ...notification, email: !notification.email })
          }
        />
        <ToggleSwitch
          label={"SMS notification"}
          isEnabled={notification.sms}
          onToggle={() =>
            setNotification({ ...notification, sms: !notification.sms })
          }
        />
      </div>
    </SettingSection>
  );
}

export default Notification;
