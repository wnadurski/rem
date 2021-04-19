import { User } from "../User"
import { getToken } from "./token"

// export async function getCurrentUser(): Promise<User | undefined> {
//   const token = getToken()
//
//   const requestOps = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token || "invalid"}`,
//     },
//   }
//   // eslint-disable-next-line no-undef
//   return fetch("/api/auth/user", requestOps).then((res) => {
//     // tutaj^
//     if (res.status !== 200) {
//       return undefined
//     }
//     return res.json()
//   })
// }

export function getCurrentUser(): Promise<User | undefined> {
  return Promise.resolve({ email: "Witam serdecznie" })
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: getToken() }),
  }
  const res = await fetch("/api/auth/logout", requestOps)

  if (res.status !== 200) {
    return undefined
  }

  return res.json()
}
