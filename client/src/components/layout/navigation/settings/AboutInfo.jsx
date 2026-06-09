import { Info } from "lucide-react";
import Accordian from "../../../common/Accordian";
import SettingSection from "./SettingSection";

function AboutInfo() {
  return (
    <SettingSection icon={Info} title="About">
      <Accordian title="Terms and Conditions">
        <li>Users must avoid harmful or illegal content.</li>
        <li>Misuse may lead to account restrictions.</li>
        <li>Respect community guidelines and other users.</li>
      </Accordian>
      <Accordian title="Report issue">
        <li>Found a bug or unexpected behavior?</li>
        <li>Share the steps to reproduce the issue.</li>
        <li>Your feedback helps improve the app.</li>
      </Accordian>
      <Accordian title="Contact info">
        <li className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
          <i className="bi bi-github"></i>
          <a
            href="http://github.com/Jyoti520"
            target="_blank"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Github Profile
          </a>
        </li>
        <li className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
          <i className="bi bi-bi-code-slash"></i>
          <a
            href="http://github.com/Jyoti520/Chatverse"
            target="_blank"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Project Repository
          </a>
        </li>
      </Accordian>
    </SettingSection>
  );
}

export default AboutInfo;
