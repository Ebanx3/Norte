import type { ReactNode } from "react";
import { SiteContextProvider } from "./siteCtxProvider";
import { EconomyContextProvider } from "./economyCtxProvider";
import { ExercisesCtxProvider } from "./exercisesCtxProvider";
import { ReadingContextProvider } from "./readingCtxProvider";
import { MeditatingCtxProvider } from "./meditatingCtxProvider";

export const ContextsProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SiteContextProvider>
      <ExercisesCtxProvider>
        <EconomyContextProvider>
          <MeditatingCtxProvider>
              <ReadingContextProvider>{children}</ReadingContextProvider>
          </MeditatingCtxProvider>
        </EconomyContextProvider>
      </ExercisesCtxProvider>
    </SiteContextProvider>
  );
};
