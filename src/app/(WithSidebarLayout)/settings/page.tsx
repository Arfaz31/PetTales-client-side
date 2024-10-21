import React from "react";
import AccountPage from "./account/page";
import SettingsMiddleTab from "../_component/module/settingsMiddleTab";

const Settings = () => {
  return (
    <div>
      <div className="lg:block hidden">
        <AccountPage />
      </div>
      <div className="block lg:hidden">
        <SettingsMiddleTab />
      </div>
    </div>
  );
};

export default Settings;
