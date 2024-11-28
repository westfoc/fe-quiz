import { useCallback } from "react";
import type { SyntheticEvent } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

interface AnswerInputProps {
  questionLetter: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function AnswerInput({
  questionLetter,
  value,
  onChange,
}: AnswerInputProps) {
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

  const questionLetterStr = questionLetter.toString();
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
        id={questionLetterStr}
        onBlur={onContentBlur}
        html={value}
      />
    </div>
  );
}
