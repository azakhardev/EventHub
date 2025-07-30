import { Field, Label } from "@headlessui/react";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";
import { useState } from "react";
import type { LoginResponse } from "../../types/helpers";
const api = import.meta.env.VITE_API_URL;

interface LoginPageProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const credentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = (await response.json()) as LoginResponse;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId.toString());
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div
      className="w-[100vw] h-[100vh] flex flex-col items-center justify-center animate-backgroundMove"
      style={{
        background:
          "linear-gradient(135deg, #ffffff, #e0e0e0, var(--color-surface))",
        backgroundSize: "200% 200%",
      }}
    >
      <h1 className="text-surface">EventHub</h1>
      <h3 className="text-primary italic">
        Single app for all of your events.
      </h3>
      <div className="w-[400px] h-[500px] bg-card rounded-lg p-8 mt-4 border-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <Label className="font-bold">Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                type="email"
                required
              />
            </Field>
            <Field className="flex flex-col gap-2">
              <Label className="font-bold">Password</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </Field>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </div>

          <div className="flex flex-row items-center justify-center">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
