import { useState } from "react";

function Warning() {
  const [warningValue, setWarningValue] = useState<boolean | null>(() => {
    const storedValue = localStorage.getItem("warning");
    const parsedValue = storedValue ? JSON.parse(storedValue) : false;
    return parsedValue;
  });

  return (
    <div
      className={`
        flex items-center md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0 py-2 px-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 justify-center fixed z-10 w-full
        ${!warningValue ? "fade-down-min " : "animate-hidden"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide-icon lucide lucide-alert-triangle mr-1"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>{" "}
      <p className="text-xs md:text-sm text-center">
        The audios used in this application are the property of their respective
        owners and are used for educational purposes. We do not claim ownership
        of these materials and we do not intend to infringe any copyright.
      </p>{" "}
      <button
        onClick={() => {
          localStorage.setItem("warning", JSON.stringify(true));
          setWarningValue(true);
        }}
        className="ml-auto border border-gray-600 transition-colors flex items-center space-x-1 rounded-md p-2 duration-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide-icon lucide lucide-check "
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>{" "}
        <span>Accept</span>
      </button>
    </div>
  );
}

export { Warning };
