import { useEffect, useState } from "react";
import "../../styles/Variables.css";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="dark-toggle">
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
