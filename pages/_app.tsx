import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import { AppIcon } from "src/components/app-icon";
import { appwriteClient } from "src/utility";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

i18next.use(initReactI18next).init({
 lng: 'en', 
  resources: {
    en: {
      translation: {
        greeting: 'Hello',
      },
    },
    fr: {
      translation: {
        greeting: 'Bonjour',
      },
    },
  }
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="Utility Studio"
            icon={<AppIcon />}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(appwriteClient, {
                databaseId: "database",
              })}
              liveProvider={liveProvider(appwriteClient, {
                databaseId: "database",
              })}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "studio",
                  list: "/studio",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "Youtube",
                  list: "/studio/youtube",
                  create: "/youtube/create",
                  edit: "/youtube/edit/:id",
                  show: "/youtube/show/:id",
                  meta: {
                    canDelete: false,
                  },
                },
                {
                  name: "Documents",
                  list: "/studio/documents",
                  create: "/documents/create",
                  edit: "/documents/edit/:id",
                  show: "/documents/show/:id",
                  meta: {
                    canDelete: false,
                  },
                },
                {
                  name: "Images",
                  list: "/studio/images",
                  create: "/images/create",
                  edit: "/images/edit/:id",
                  show: "/images/show/:id",
                  meta: {
                    canDelete: false,
                  },
                },
                {
                  name: "Links",
                  list: "/studio/links",
                  create: "/links/create",
                  edit: "/links/edit/:id",
                  show: "/links/show/:id",
                  meta: {
                    canDelete: false,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
              }}
            >
              {renderComponent()}
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
