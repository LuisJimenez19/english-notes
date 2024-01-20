import { CardMain } from "./components/CardMain";
import { Header } from "./components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Warning } from "./components/Warning";

function App() {
  /* No lo renderiza, en el componente gestiono el valor en localSotrage para poder hacer la animación. */
  const storeWarningValue = localStorage.getItem("warning");
  const showWarning = storeWarningValue ? JSON.parse(storeWarningValue) : false;

  return (
    <ThemeProvider>
      <div className="font-vietnam w-full overflow-hidden min-h-screen flex flex-col">
        {!showWarning && <Warning />}
        <Header />

        <main className="relative w-full flex-grow ">
          {/* Background */}

          <CardMain />
        </main>
        <footer className="bg-transparent py-4 ">
          <p className="text-sm text-center text-gray-500">
            By{" "}
            <a
              className="
              font-semibold  underline
              text-transparent bg-clip-text inline-block
              bg-gradient-to-b from-gray-900 to-gray-600 

              dark:bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-gray-100 dark:to-gray-900
              "
              rel="noreferrer noopener"
              target="_blank"
              href="https://angeljimenez.netlify.app/"
            >
              Luis Jiménez
            </a>{" "}
            ♥
          </p>
        </footer>

        {/* Background */}
        <div className="-z-50 absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      </div>
    </ThemeProvider>
  );
}

export { App };
