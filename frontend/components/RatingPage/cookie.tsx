import dayjs, { Dayjs, isDayjs } from "dayjs";

export interface CookieOptions {
  domain?: string;
  path?: string;
  sameSite?: "Lax" | "None" | "Strict" | "lax" | "none" | "strict";
  expires?: Date | Dayjs;
  secure?: boolean;
}

/* export function setCookie(
  name: string,
  value: string,
  options?: CookieOptions
) {
  if (!name || !value) return;
  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);
  console.log(updatedCookie);

  if (options) {
    for (const [key, value] of Object.entries(options)) {
      let encoded = value;
      if (key === "expires") {
        encoded = isDayjs(value as Date | Dayjs)
          ? dayjs(value).toDate().toUTCString()
          : value.toUTCString();
      }
      updatedCookie += ";" + key + "=" + encoded;
    }
  }

  if (!options?.path) {
    updatedCookie += "; path=/";
  }

  document.cookie = updatedCookie;
}
export function getCookie(name: string) {}
export function removeCookie() {}

console.log(document.cookie);
setCookie("test", true.toString());
setCookie("test2", "jambon", { sameSite: "lax", secure: true });
console.log(document.cookie); */

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}

setCookie("test", "jambon");
console.log(document.cookie);
console.log(getCookie("test"));

