const keyName = "auth.token"

export const setToken = (token: string): void => {
  window.localStorage.setItem(keyName, token)
}

export const getToken = (): string | undefined => {
  return window.localStorage.getItem(keyName) ?? undefined
}

export const removeToken = (): void => {
  window.localStorage.removeItem(keyName)
}
