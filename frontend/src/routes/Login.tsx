import { type FormEvent, useState } from "react";

import { login } from "../api/auth";

import Button from "../components/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

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
    <main className="mx-auto h-screen w-[min(95%,_500px)] flex flex-col gap-4 sm:gap-8 justify-center">
      <h1 className="font-display font-bold text-4xl">Log In</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-[15vh] p-4 flex flex-col gap-2 items-end bg-[#FFFFF0] border-2 border-[#232232] rounded-lg shadow-2"
      >
        {errorText && <code>{errorText}</code>}
        <div className="w-full flex flex-col items-start">
          <label className="font-display" htmlFor="username">
            Username or Email:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 py-1 w-full bg-[#FFFFF5] border-2 border-[#232232]/60 rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col items-start">
          <label className="font-display" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 w-full border-2 border-[#22232a]/50 rounded-sm"
          />
        </div>
        <Button type="submit" className="mt-4 sm:mt-8">
          Log in
        </Button>
      </form>
    </main>
  );
}

export default Login;
