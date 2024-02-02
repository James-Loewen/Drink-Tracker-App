import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import { login, register } from "../api/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // const [errorText, setErrorText] = useState("");

  const labelGroup = "w-full flex flex-col items-start";
  const labelClass = "pl-2 font-display";
  const inputClass = "px-2 py-1 w-full border-2 border-[#232232]/60 rounded";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, success, message, errors } = await register(
      username,
      email,
      password1,
      password2
    );
    console.log(data);
    console.log(success);
    console.log(message);
    console.log(errors);
    if (success && data) {
      await login(username, password1);
      window.location.assign("/");
    }
  }

  return (
    <main className="mx-auto h-screen w-[min(90%,_500px)] flex flex-col gap-4 sm:gap-8 justify-center">
      <h1 className="font-display font-bold text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-[15vh] p-4 flex flex-col gap-1 items-end bg-[#FFFFF5] border-2 border-[#232232] rounded-lg shadow-2"
      >
        {/* {errorText && <code>{errorText}</code>} */}
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="username">
            Username
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
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="password1">
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="password2">
            Password (again)
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="mt-4 p-1 flex gap-4 sm:gap-6 items-center">
          <Link className="underline text-teal" to="/login">
            Already a member?
          </Link>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </main>
  );
}

export default Register;
