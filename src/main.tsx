import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./i18n";
import GlobalLoading from "./components/global-loading";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <main className="w-full h-full flex flex-col justify-center items-center">
          <GlobalLoading />
        </main>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
