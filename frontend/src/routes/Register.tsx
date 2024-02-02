import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Button from "../components/Button";
import { login, register } from "../api/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameError, setUsernameError] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const labelGroup = "w-full flex flex-col items-start";
  const labelClass = "pl-2 font-display";
  const inputClass = "px-2 py-1 w-full border-2 border-raisin-black/60 rounded";
  const errorClass = "font-mono text-danger";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUsernameError([]);
    setPasswordError([]);

    const { data, success, errors } = await register(
      username,
      email,
      password1,
      password2
    );

    if (!success && errors !== null) {
      if (errors.password) {
        setPasswordError(errors.password);
      }
      if (errors.username) {
        setUsernameError(errors.username);
      }
    } else if (success && data) {
      await login(username, password1);
      window.location.assign("/");
    }
  }

  return (
    <main className="mx-auto h-screen w-[min(90%,_500px)] flex flex-col gap-4 sm:gap-8 justify-center">
      <h1 className="font-display font-bold text-4xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-[15vh] p-4 flex flex-col gap-1 items-end bg-slate-400/30 border-2 border-raisin-black rounded-lg shadow-2"
      >
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="username">
            Username
          </label>
          {usernameError.map((error, i) => (
            <span key={i} className={errorClass}>
              {error}
            </span>
          ))}
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={clsx(
              inputClass,
              usernameError.length > 0 && "shadow-danger"
            )}
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
            className={clsx(
              inputClass,
              usernameError.length > 0 && "shadow-danger"
            )}
          />
        </div>
        <div className={labelGroup}>
          <label className={labelClass} htmlFor="password1">
            Password
          </label>
          {passwordError.map((error, i) => (
            <span key={i} className={errorClass}>
              {error}
            </span>
          ))}
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className={clsx(
              inputClass,
              passwordError.length > 0 && "shadow-danger"
            )}
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
            className={clsx(
              inputClass,
              passwordError.length > 0 && "shadow-danger"
            )}
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
