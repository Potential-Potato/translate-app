import { useState } from "react";
import TranslateForm from "./components/TranslateForm";
import TranslateOutput from "./components/TranslateOutput";
import type { langInput } from "./types/types";
import scribe from "../public/ts.svg";

const LANGS: langInput[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
];

function App() {
  const [sourceText, setSourceText] = useState("Hello, how are you");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [translation, setTranslation] = useState("");

  // // translation form (passes sourcetext, sourcelang)
  const handleTranslate = async (text: string, from: string) => {
    setSourceText(text);
    setSourceLang(from);

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${from}|${targetLang}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const translated = data.responseData?.translatedText || "";
      setTranslation(translated);
      console.log(translated);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslation("Error fetching translation");
    }
  };

  const handleTargetLang = (to: string) => {
    setTargetLang(to);
  };

  const speakText = (content: string) => {
    const textToSpeak = content?.trim() || "Hello, how are you";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = sourceLang; // set language for correct pronunciation
    window.speechSynthesis.cancel(); // stop any ongoing speech
    window.speechSynthesis.speak(utterance);
  };

  const copyText = async (content: string) => {
    if (!content) return; // nothing to copy
    try {
      navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center max-w-screen-2xl w-full mx-auto">
      <div className="flex w-full h-20 justify-center items-center my-20">
        <img src={scribe} alt="" className="object-cover w-20 h-full" />
        <h1 className="font-sans font-bold">Scribe</h1>
      </div>
      <section className="flex gap-5 flex-wrap justify-center">
        <TranslateForm
          onTranslate={handleTranslate}
          langs={LANGS}
          speakText={speakText}
          copyText={copyText}
        />
        <TranslateOutput
          translation={translation}
          langs={LANGS}
          targetLang={handleTargetLang}
          speakText={speakText}
          copyText={copyText}
        />
      </section>
    </main>
  );
}

export default App;
