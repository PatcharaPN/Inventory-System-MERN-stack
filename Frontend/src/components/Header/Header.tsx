import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";

const Header = () => {
  const [isPopover, setPopover] = useState(false);
  const [language, setLanguage] = useState(i18n.language);
  const navigate = useNavigate();
  const currentUser = useAppSelector(
    (state: RootState) => state.auth.currentUser
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);
  const getUserInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return names[0][0] + names[1][0];
    }
    return names[0][0] + names[0][4];
  };

  const logout = async () => {
    dispatch(logout);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang).then(() => {
      setLanguage(newLang); // Update state to reflect the change
      localStorage.setItem("language", newLang); // Save to localStorage
    });
  };

  useEffect(() => {
    // Retrieve the saved language from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const languages = [
    { code: "en", label: "EN" },
    { code: "th", label: "TH" },
  ];

  return (
    <div className="head-container">
      <div className="user-container">
        <Icon color="#7F5AF0" icon="uil:setting" width={30} />
        <Icon color="#7F5AF0" icon="material-symbols:mail" width={30} />
        <select
          className="language-Change"
          onChange={handleLanguageChange}
          value={language}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
        <div className="popover-user">
          <p>
            {currentUser.username} ({currentUser.role})
          </p>
          <Icon
            onClick={() => setPopover(!isPopover)}
            icon="iconamoon:arrow-down-2-duotone"
          />
        </div>
        <div className={`popover-menu ${isPopover ? "show" : ""}`}>
          <ul>
            <li className="menu" onClick={logout}>
              <Icon icon="iconamoon:profile" /> Edit Profile
            </li>
            <li className="menu" onClick={logout}>
              <Icon icon="uil:setting" /> Setting
            </li>
            <li className="menu" onClick={logout}>
              <Icon icon="material-symbols:login" /> Log out
            </li>
          </ul>
        </div>
        <div
          className="user-pic"
          style={{
            border: currentUser.role === "admin" ? "solid 2px #00FF95" : "none",
          }}
        >
          {getUserInitials(currentUser.username).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;
