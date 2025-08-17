import { useState } from "react";
import TranslateForm from "./components/TranslateForm";
import TranslateOutput from "./components/TranslateOutput";
import type { langInput } from "./types/types";

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

  const handleSwitchLangs = (from: string, to: string) => {
    setTargetLang(from);
    setSourceLang(to);
    setTranslation(""); // clear previous translation
  };

  return (
    <main className="flex flex-col justify-center items-center max-w-screen-2xl w-full mx-auto">
      <h1 className="my-[6.5rem] ">Scribe</h1>
      <section className="flex gap-5 flex-wrap justify-center">
        <TranslateForm onTranslate={handleTranslate} langs={LANGS} />
        <TranslateOutput
          translation={translation}
          langs={LANGS}
          sourceLang={sourceLang}
          targetLang={handleTargetLang}
          switchLang={handleSwitchLangs}
        />
      </section>
    </main>
  );
}

export default App;
