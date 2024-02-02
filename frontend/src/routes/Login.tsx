import { type FormEvent, useState } from "react";

import { login } from "../api/auth";

import Button from "../components/Button";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const labelGroup = "w-full flex flex-col items-start";
  const labelClass = "pl-2 font-display";
  const inputClass = "px-2 py-1 w-full border-2 border-[#232232]/60 rounded";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await login(username, password);

    if (error) {
      setErrorText(error.detail);
    } else if (data) {
      window.location.assign("/graph/week");
    }
  }

  return (
    <main className="mx-auto h-screen w-[min(90%,_500px)] flex flex-col gap-4 sm:gap-8 justify-center">
      <h1 className="font-display font-bold text-4xl">Log In</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-[15vh] p-4 flex flex-col gap-2 items-end bg-[#FFFFF5] border-2 border-[#232232] rounded-lg shadow-2"
      >
        {errorText && <code>{errorText}</code>}
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="username">
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mt-4 p-1 flex gap-4 sm:gap-6 items-center">
          <Link className="underline text-teal" to="/register">
            Or Sign Up
          </Link>
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </main>
  );
}

export default Login;
