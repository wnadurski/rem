import { User } from "../User"
import { getToken } from "./token"

export async function getCurrentUser(): Promise<User | undefined> {
  const requestOps = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken() || "invalid"}`,
    },
  }
  return fetch("/api/auth/me", requestOps).then((res) => {
    if (res.status !== 200) {
      return undefined
    }
    return res.json()
  })
}

export async function attemptLogin(
  login: string,
  password: string
): Promise<
  | {
      token: string
    }
  | undefined
> {
  const requestOps = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  }

  return fetch("/api/auth/login", requestOps).then((res) => {
    if (res.status !== 200) {
      return undefined
    }

    return res.json()
  })
}

export async function logOut(): Promise<{ token: string } | undefined> {
  const requestOps = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken() || "invalid"}`,
    },
  }
  const res = await fetch("/api/auth/logout", requestOps)

  if (res.status !== 200) {
    return undefined
  }
  return res.json()
}
