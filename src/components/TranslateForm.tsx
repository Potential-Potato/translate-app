// user input
import { schema } from "../types/types";
import type { schemaInput, langInput } from "../types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import speaker from "../../public/speaker.svg";
import copy from "../../public/Copy.svg";

export default function TranslateForm({
  onTranslate,
  langs,
  speakText,
  copyText,
}: {
  onTranslate: (text: string, from: string) => void;
  langs: langInput[];
  speakText: (content: string) => void;
  copyText: (content: string) => void;
}) {
  const form = useForm<schemaInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
      sourceLang: "en",
    },
  });

  const sourceLang = form.watch("sourceLang"); // keep watch of the value inside form
  const content = form.watch("content"); // watch textarea value
  const maxChars = 500;

  const setSourceLang = (lang: schemaInput["sourceLang"]) =>
    form.setValue("sourceLang", lang);

  const onSubmit = async (data: schemaInput) => {
    const textToTranslate = data.content.trim() || "Hello, how are you";
    onTranslate(textToTranslate, data.sourceLang);
  };

  return (
    <section className="flex  flex-col p-5 bg-[#1f283cb1] rounded-3xl w-[38rem] h-[22rem] border border-gray-500">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <nav className="items-center flex gap-7 py-2 border-b border-gray-400">
          <p>Detected Language</p>
          <div className="flex gap-7">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setSourceLang(code)}
                className={`px-3 py-1 h-10 rounded-lg text-sm font-semibold ${
                  sourceLang === code
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
          {...form.register("content")}
          placeholder="Hello, how are you?"
          className="w-full h-[11rem] bg-transparent mt-2 p-2 text-white font-semibold"
          maxLength={maxChars}
        />
        <p className="text-right text-xs text-gray-300">
          {content?.length || 0} / {maxChars}
        </p>

        {form.formState.errors.content && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.content.message}
          </p>
        )}
        <div className="mt-2 flex justify-between">
          <div>
            <button
              onClick={() => speakText(content)}
              className="bg-transparent text-gray-300 w-50 h-10"
            >
              <img src={speaker} className="w-full h-full object-contain" />
            </button>
            <button
              onClick={() => {
                copyText(content);
              }}
              className="bg-transparent text-gray-300 w-50 h-10"
            >
              <img src={copy} className="w-full h-full object-contain" />
            </button>
          </div>
          <button
            type="submit"
            className="   bg-transparent text-gray-300 
            px-4 py-2 rounded-lg 
            transition-colors duration-200
            hover:bg-gray-700 hover:text-white 
            active:scale-95 
            focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            Translate
          </button>
        </div>
      </form>
    </section>
  );
}
