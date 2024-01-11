import getCookie from "../utils/getCookie";

export const API_PATH = import.meta.env.PROD
  ? ""
  : `${import.meta.env.VITE_HOST}`;

type LoginDataType = {
  success: boolean;
  message: "Successfully logged in.";
};

type ErrorType = {
  status: number;
  detail: string;
};

export type LoginResponseType = {
  error: ErrorType | null;
  data: LoginDataType | null;
};

export async function login(usernameOrEmail: string, password: string) {
  let data: LoginDataType | null = null;
  let error: ErrorType | null = null;
  let success: boolean = false;
  let message: string = "insert message here..";

  const res = await fetch(`${API_PATH}/auth/login/`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken")!,
    },
    body: JSON.stringify({ usernameOrEmail, password }),
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
  const res = await fetch(`${API_PATH}/auth/logout/`, {
    credentials: "include",
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken")!,
    },
  });
  if (res.status === 200) {
    console.log("Logged out!");
    window.location.assign("/login");
  } else {
    console.log("What the hell happened...");
  }
}
