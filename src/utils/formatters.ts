import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { z } from "zod";

type Locales = "es-ES" | "en-US" | "pt-BR" | "fr-FR" | "es-MX";

export const priceFormatter = (
  price: number,
  currency: Intl.NumberFormatOptions["currency"],
  locale: Locales,
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(price);
};

export const dateFormatter = (date: Date, locale: Locales) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const dateTimeFormatter = (date: Date, locale: Locales) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};

export const pathnameFormatter = (pathname: string, params: Params) => {
  return pathname.replaceAll(/\[(.*?)\]/g, (match, p1) => {
    const param = params[p1];

    if (param == null) {
      return match;
    }

    return `${z.string().parse(param)}`;
  });
};
