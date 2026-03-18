interface LoginFormProps {
  action: (formData: FormData) => Promise<void>;
  callbackUrl: string;
  error: string | null;
  locale: string;
}

export function LoginForm({
  action,
  callbackUrl,
  error,
  locale,
}: LoginFormProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4">
      <section className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
        <header className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Use your account credentials to continue.
          </p>
        </header>

        <form action={action} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Invalid email or password.
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Active locale: {locale}
        </p>
      </section>
    </main>
  );
}
