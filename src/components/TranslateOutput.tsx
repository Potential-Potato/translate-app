import { useState } from "react";
import type { langInput } from "../types/types";
import speaker from "../../public/speaker.svg";
import copy from "../../public/Copy.svg";

export default function TranslateOutput({
  targetLang,
  translation,
  langs,
  speakText,
  copyText,
}: {
  targetLang: (to: string) => void;
  translation: string;
  langs: langInput[];
  speakText: (content: string) => void;
  copyText: (content: string) => void;
}) {
  const [selectedLang, setSelectedLang] = useState(langs[1].code);

  return (
    <section className="flex  flex-col p-4 bg-[#1a2337cc] rounded-3xl w-[38rem] h-[22rem] border border-gray-500 ">
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
        </div>
      </nav>
      <textarea
        value={translation}
        readOnly
        className="w-full h-[11rem] bg-transparent mt-2 p-2 text-white font-semibold"
      />
      <div className="mt-10 flex">
        <button
          onClick={() => speakText(translation)}
          className="bg-transparent text-gray-300 w-50 h-10"
        >
          <img src={speaker} className="w-full h-full object-contain" />
        </button>
        <button
          onClick={() => {
            copyText(translation);
          }}
          className="bg-transparent text-gray-300 w-50 h-10"
        >
          <img src={copy} className="w-full h-full object-contain" />
        </button>
      </div>
    </section>
  );
}
