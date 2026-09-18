"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const ACCESS_KEY = "mvcrm-access-v1";
const DEMO_PASSWORD = "123";

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setAuthorized(localStorage.getItem(ACCESS_KEY) === "authorized");
    } catch {
      setAuthorized(false);
    }
  }, []);

  useEffect(() => {
    if (authorized === false) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
      return () => window.clearTimeout(timer);
    }
  }, [authorized]);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (password === DEMO_PASSWORD) {
      try {
        localStorage.setItem(ACCESS_KEY, "authorized");
      } catch {}
      setError(false);
      setAuthorized(true);
      return;
    }

    setError(true);
    setPassword("");
    inputRef.current?.focus();
  };

  const locked = authorized !== true;

  return (
    <>
      <div
        aria-hidden={locked}
        className={
          locked
            ? "min-h-screen blur-[9px] scale-[1.01] pointer-events-none select-none transition-[filter,transform] duration-300"
            : "min-h-screen blur-0 scale-100 transition-[filter,transform] duration-300"
        }
      >
        {children}
      </div>

      {locked && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-[2px] p-4">
          <form
            onSubmit={submit}
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-ink text-white">
              <LockKeyhole size={21} />
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-xl font-bold text-ink">Acesso ao MV CRM</h1>
              <p className="mt-1 text-sm text-gray-500">
                Digite a senha para visualizar o sistema.
              </p>
            </div>

            <div className="relative mt-5">
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                inputMode="numeric"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError(false);
                }}
                placeholder="Senha"
                aria-label="Senha de acesso"
                className={
                  "w-full rounded-xl border bg-white px-4 py-3 pr-11 text-center text-lg tracking-[0.35em] outline-none transition " +
                  (error
                    ? "border-red-300 ring-2 ring-red-100"
                    : "border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-center text-xs font-medium text-red-600">
                Senha incorreta. Tente novamente.
              </p>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              Acessar sistema
            </button>

            <p className="mt-4 text-center text-[11px] leading-4 text-gray-400">
              Depois do primeiro acesso, este navegador será lembrado e a senha não será solicitada novamente.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
