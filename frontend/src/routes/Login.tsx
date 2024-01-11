import { type FormEvent, useState } from "react";
import { clsx } from "clsx";
import { login } from "../services/auth";
import Button from "../components/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const styles = {
    labelGroup: clsx("flex", "flex-col", "items-start"),
    textInput: clsx("px-2 py-1 border-2 border-[#22232a]/50 rounded"),
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await login(username, password);

    if (error) {
      setErrorText(error.detail);
    } else if (data) {
      // window.location.reload();
      window.location.assign("/");
    }
  }

  return (
    <main className="min-w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col gap-2 items-end border-4 rounded-md"
      >
        {errorText && <code>{errorText}</code>}
        <div className={styles.labelGroup}>
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.textInput}
          />
        </div>
        <div className={styles.labelGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textInput}
          />
        </div>
        <Button type="submit">Log in</Button>
      </form>
    </main>
  );
}

export default Login;
