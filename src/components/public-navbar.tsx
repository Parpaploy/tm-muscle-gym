import { useTranslation } from "react-i18next";

export default function PublicNavbar() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-[#FFA60C] w-full max-w-107.5 min-h-[7svh]">
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>

      <button onClick={() => i18n.changeLanguage("th")}>TH</button>
    </div>
  );
}
