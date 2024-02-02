import { getCsrfCookie } from "../utils/cookies";

export const API_PATH = import.meta.env.PROD
  ? "https://drink-tracker.app/api"
  : `${import.meta.env.VITE_HOST}/api`;

type LoginDataType = {
  success: boolean;
  message: "Successfully logged in.";
};

export type UserDetails = {
  full_name: string;
  display_username: string;
  display_name: string;
  email: string;
};

type ErrorType = {
  status: number;
  detail: string;
};

export type LoginResponseType = {
  error: ErrorType | null;
  data: LoginDataType | null;
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

export async function login(username_or_email: string, password: string) {
  let data: LoginDataType | null = null;
  let error: ErrorType | null = null;
  let success: boolean = false;
  let message: string = "insert message here..";

  const res = await fetch(`${API_PATH}/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({ username_or_email, password }),
  });

  if (res.status === 200) {
    data = await res.json();
    if (data && data.success) {
      success = data.success;
      message = data.message;
    }
  } else {
    const status = res.status;
    const { detail } = await res.json();
    error = { status, detail };
    message = "Something ran amok";
  }

  return { error, data, success, message };
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
) {
  let data: UserDetails | null = null;
  let success: boolean = false;
  let message: string = "";
  let errors: string[] = [];

  const res = await fetch(`${API_PATH}/auth/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({ username, email, password1, password2 }),
  });

  if (res.status === 201) {
    data = await res.json();
    success = true;
    message = "User created.";
  } else if (res.status === 400) {
    const err_res = await res.json();
    errors = err_res.errors;
  }

  return { data, success, message, errors };
}
