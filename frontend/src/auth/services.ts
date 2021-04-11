import { User } from "../User"

export async function getCurrentUser(): Promise<User | undefined> {
  const token = window.localStorage.getItem("token")

  const requestOps = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || "invalid"}`,
    },
  }
  // eslint-disable-next-line no-undef
  return fetch("/api/auth/getuser", requestOps).then((res) => {
    // tutaj^
    if (res.status !== 200) {
      return undefined
    }
    return res.json()
  })
}

export async function loginAttempt(
  username: string,
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
    body: JSON.stringify({ username, password }),
  }

  return fetch("/api/auth/login", requestOps).then((res) => {
    if (res.status !== 200) {
      return undefined
    }

    return res.json()
  })
}

export async function logOut(): Promise<{ token: string } | undefined> {
  //tutaj ^
  const requestOps = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: window.localStorage.getItem("Token"),
  }
  return fetch("/api/auth/logout", requestOps).then((res) => {
    //tutaj ^
    if (res.status !== 200) {
      return undefined
    }

    return res.json()
  })
}
