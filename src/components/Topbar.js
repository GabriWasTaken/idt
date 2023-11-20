import React from "react";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleChangeLangClick = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {location.pathname !== "/" && <button onClick={handleGoBack}>{t("back")}</button>}
      <Flag country="US" style={{ cursor: "pointer" }} onClick={() => handleChangeLangClick("en")} />{" "}
      <Flag country="IT" style={{ cursor: "pointer" }} onClick={() => handleChangeLangClick("it")} />
    </div>
  );
};

export default Topbar;
