import React from "react";
import {
  ResetDialog,
  GenericFallback,
  ServiceWorkerToastContainer,
  ThemeProvider,
  appkitTranslations,
} from "@dxos/react-appkit";
import { ClientProvider } from "@dxos/react-client";
import { Config, Dynamics, Local, Defaults } from "@dxos/config";
import { useRegisterSW } from "virtual:pwa-register/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { TodoList } from "./TodoList";

// Dynamics allows configuration to be supplied by the hosting KUBE.
const config = async () => new Config(await Dynamics(), Local(), Defaults());

export const App = () => {
  const serviceWorker = useRegisterSW();
  return (
    <ThemeProvider
      appNs="dxos-tasks"
      resourceExtensions={[appkitTranslations]}
      fallback={<GenericFallback />}
    >
      <ErrorBoundary
        fallback={({ error }) => <ResetDialog error={error} config={config} />}
      >
        <ClientProvider config={config} fallback={GenericFallback}>
          <TodoList />
          <ServiceWorkerToastContainer {...serviceWorker} />
        </ClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
