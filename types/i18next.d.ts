import 'next-i18next';

declare module 'next-i18next' {
  interface Config {
    i18n: {
      defaultLocale: string;
      locales: string[];
    };
  }
}
