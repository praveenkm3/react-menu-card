import { useState } from "react"

const USERS_STORAGE_KEY = "menucard-users"

function readUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
  if (storedUsers === null) {
    return []
  }

  const users = JSON.parse(storedUsers)
  if (!Array.isArray(users) || users.some(user =>
    !user ||
    typeof user.email !== "string" ||
    typeof user.name !== "string" ||
    typeof user.salt !== "string" ||
    typeof user.passwordHash !== "string"
  )) {
    throw new Error("Saved account data is invalid. Clear this app's local storage and try again.")
  }

  return users
}

function toHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("")
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure browser cryptography is unavailable. Use HTTPS or localhost and try again.")
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  )
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
    key,
    256
  )

  return toHex(new Uint8Array(hash))
}

function createSalt() {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error("Secure browser cryptography is unavailable. Use HTTPS or localhost and try again.")
  }

  return crypto.getRandomValues(new Uint8Array(16))
}

function Auth(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isRegistering = props.mode === "register"

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const normalizedEmail = email.trim().toLowerCase()
      const users = readUsers()

      if (isRegistering) {
        if (password.length < 8) {
          throw new Error("Use a password with at least 8 characters.")
        }
        if (password !== confirmPassword) {
          throw new Error("The passwords do not match.")
        }
        if (users.some(user => user.email === normalizedEmail)) {
          throw new Error("An account with this email already exists.")
        }

        const salt = createSalt()
        const user = {
          name: name.trim(),
          email: normalizedEmail,
          salt: toHex(salt),
          passwordHash: await hashPassword(password, salt),
        }
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...users, user]))
        localStorage.setItem("menucard-session", JSON.stringify({
          name: user.name,
          email: user.email,
        }))
        props.onAuthenticated({ name: user.name, email: user.email })
      } else {
        const user = users.find(savedUser => savedUser.email === normalizedEmail)
        if (!user) {
          throw new Error("No account found for this email.")
        }

        const salt = Uint8Array.from(
          user.salt.match(/.{2}/g) || [],
          byte => Number.parseInt(byte, 16)
        )
        const passwordHash = await hashPassword(password, salt)
        if (passwordHash !== user.passwordHash) {
          throw new Error("Incorrect password.")
        }

        const session = { name: user.name, email: user.email }
        localStorage.setItem("menucard-session", JSON.stringify(session))
        props.onAuthenticated(session)
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to complete authentication.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <h1 id="auth-title" className="page-title">
        {isRegistering ? "Create your account" : "Welcome back"}
      </h1>
      <p className="auth-description">
        {isRegistering ? "Register to get started." : "Log in to your MenuCard account."}
      </p>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegistering && (
          <label>
            Name
            <input
              autoComplete="name"
              onChange={event => setName(event.target.value)}
              required
              value={name}
            />
          </label>
        )}
        <label>
          Email
          <input
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label>
          Password
          <input
            autoComplete={isRegistering ? "new-password" : "current-password"}
            onChange={event => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        {isRegistering && (
          <label>
            Confirm password
            <input
              autoComplete="new-password"
              onChange={event => setConfirmPassword(event.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
          </label>
        )}
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Please wait..." : isRegistering ? "Register" : "Log in"}
        </button>
      </form>
      <p className="auth-switch">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="auth-switch-button"
          onClick={() => props.onModeChange(isRegistering ? "login" : "register")}
          type="button"
        >
          {isRegistering ? "Log in" : "Register"}
        </button>
      </p>
      <p className="auth-notice">
        Demo only: account data stays in this browser and is not secure authentication.
      </p>
    </section>
  )
}

export default Auth
