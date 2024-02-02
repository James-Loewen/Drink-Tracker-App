import { getCsrfCookie } from "../utils/cookies";

export const API_PATH = import.meta.env.PROD
  ? "https://drink-tracker.app/api"
  : `${import.meta.env.VITE_HOST}/api`;

export type UserDetails = {
  full_name: string;
  display_username: string;
  display_name: string;
  email: string;
};

export type LoginRegisterResponseType = {
  success: boolean;
  errors: { [key: string]: string[] };
  message: string;
  data?: UserDetails | null;
};

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit | undefined = undefined
) {
  const res = await fetch(input, init);

  if (res.status === 403 || res.status === 401) {
    window.location.assign("/login");
  }

  return res;
}

export async function login(
  username_or_email: string,
  password: string
): Promise<LoginRegisterResponseType> {
  const res = await fetch(`${API_PATH}/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({ username_or_email, password }),
  });

  const { success, message, errors }: LoginRegisterResponseType =
    await res.json();

  return { errors, success, message };
}

export async function logout() {
  const res = await fetch(`${API_PATH}/auth/logout`, {
    credentials: "include",
    method: "POST",
    headers: {
      "X-CSRFToken": getCsrfCookie()!,
    },
  });
  if (res.status === 200) {
    window.location.assign("/");
  } else {
    /**
     * Most likely a CSRF issue. This won't be a problem if the /auth/user
     * endpoint sets CSRF cookies on GET requests, but as of right now I
     * don't know how to do that with Django Ninja, so I'll continue to
     * use the Django Rest Framework endpoint I wrote.
     */
  }
}

export async function register(
  username: string,
  email: string,
  password1: string,
  password2: string
): Promise<LoginRegisterResponseType> {
  const res = await fetch(`${API_PATH}/auth/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({ username, email, password1, password2 }),
  });

  const { data, success, message, errors }: LoginRegisterResponseType =
    await res.json();

  return { data, success, message, errors };
}
