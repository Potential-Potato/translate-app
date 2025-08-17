import { useState } from "react";
import type { langInput } from "../types/types";

export default function TranslateOutput({
  targetLang,
  translation,
  langs,
  sourceLang,
  switchLang,
}: {
  targetLang: (to: string) => void;
  translation: string;
  langs: langInput[];
  sourceLang: string;
  switchLang: (to: string, from: string) => void;
}) {
  const [selectedLang, setSelectedLang] = useState(langs[1].code);

  return (
    <section className="flex  flex-col p-4 bg-[#1a2337cc] rounded-3xl w-[38rem] h-[22rem] ">
      <nav className="items-center flex gap-7 py-2 border-b border-gray-400">
        <div className="flex gap-7">
          {langs.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setSelectedLang(code);
                targetLang(code); // notify parent
              }}
              className={`px-3 py-1 h-10 rounded-lg text-sm font-semibold ${
                selectedLang === code
                  ? "bg-btnBg text-white font-bold"
                  : "bg-transparent  text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
          <button onClick={() => switchLang(sourceLang, selectedLang)}>
            switch
          </button>
        </div>
      </nav>
      <textarea
        value={translation}
        readOnly
        className="w-full h-[11rem] bg-transparent mt-2 p-2 text-white font-semibold"
      />
      <div className="mt-10 flex">
        <button type="button">speak</button>
        <button type="button">copy</button>
      </div>
    </section>
  );
}
