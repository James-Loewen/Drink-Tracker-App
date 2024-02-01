import { type FormEvent, useState } from "react";

import Button from "../components/Button";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword1("");
    setPassword2("");
  }

  return (
    <main className="mx-auto h-screen w-[min(95%,_500px)] flex flex-col gap-4 sm:gap-8 justify-center">
      <h1 className="font-display font-bold text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-[15vh] p-4 flex flex-col gap-3 items-end bg-[#FFFFF0] border-2 border-[#232232] rounded-lg shadow-2"
      >
        {/* {errorText && <code>{errorText}</code>} */}
        <div className="w-full flex flex-col gap-1 items-start">
          <label className="font-display" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-2 py-1 w-full bg-[#FFFFF5] border-2 border-[#232232]/60 rounded"
          />
        </div>
        <div className="w-full flex flex-col gap-1 items-start">
          <label className="font-display" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 w-full bg-[#FFFFF5] border-2 border-[#232232]/60 rounded"
          />
        </div>
        <div className="w-full flex flex-col gap-1 items-start">
          <label className="font-display" htmlFor="password1">
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className="px-2 py-1 w-full border-2 border-[#22232a]/50 rounded"
          />
        </div>
        <div className="w-full flex flex-col gap-1 items-start">
          <label className="font-display" htmlFor="password2">
            Password (again)
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="px-2 py-1 w-full border-2 border-[#22232a]/50 rounded"
          />
        </div>
        <Button type="submit" className="mt-4 sm:mt-8">
          Register
        </Button>
      </form>
    </main>
  );
}

export default Register;
