export const isValidUsername = (username: string) =>
  /^[0-9]{11,11}$/.test(username)

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)
