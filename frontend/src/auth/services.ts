export async function getCurrentUser(): Promise<{
  user: string
  token: string
}> {
  // eslint-disable-next-line no-undef
  return fetch(process.env.PUBLIC_URL + "/usertoken.json").then((res) =>
    res.json()
  )
}

export async function loginAttempt(
  username: string,
  password: string,
  requestOps = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: username, pass: password }),
  }
): Promise<{
  user: string
  token: string
}> {
  return fetch(
    process.env.PUBLIC_URL + "/usertoken.json",
    requestOps
  ).then((res) => res.json())
}
