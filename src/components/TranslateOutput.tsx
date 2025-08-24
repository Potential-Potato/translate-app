import { useState } from "react";
import type { langInput } from "../types/types";
import speaker from "/public/speaker.svg";
import copy from "/public/Copy.svg";

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
    <section className="flex flex-col flex-1 p-5 rounded-3xl border border-gray-500 bg-[#1f283cb1] min-w-[280px]">
      <nav className="flex flex-wrap items-center gap-3 py-2 border-b border-gray-400">
        <div className="flex gap-3">
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
                  : "bg-transparent text-gray-300"
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
      <div className="flex mt-10">
        <button
          onClick={() => speakText(translation)}
          className="h-10 text-gray-300 bg-transparent w-50"
        >
          <img src={speaker} className="object-contain w-full h-full" />
        </button>
        <button
          onClick={() => {
            copyText(translation);
          }}
          className="h-10 text-gray-300 bg-transparent w-50"
        >
          <img src={copy} className="object-contain w-full h-full" />
        </button>
      </div>
    </section>
  );
}
