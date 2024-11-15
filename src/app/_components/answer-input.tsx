import { useCallback } from "react";
import type { SyntheticEvent } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

export default function AnswerInput(props: {
  questionLetter: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { questionLetter, value, onChange } = props;
  const onContentBlur = useCallback(
    (e: SyntheticEvent) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] },
      };

      onChange(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf));
    },
    [onChange],
  );
  return (
    <div className="mb-4 flex w-full space-x-6 rounded-lg border bg-white p-5 text-left">
      <div>
        <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-black bg-white">
          <p className="font-bold text-black">{questionLetter}</p>
        </div>
      </div>
      <ContentEditable
        className="text-xl text-black focus-visible:outline-none"
        onChange={(e) => onContentBlur(e)}
        id={`${questionLetter}`}
        onBlur={onContentBlur}
        html={value}
      />
    </div>
  );
}
