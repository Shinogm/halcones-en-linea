import { USER_TYPES } from './types'

const urls = {
  [USER_TYPES.ADMIN]: '/admin',
  [USER_TYPES.PROFESSOR]: '/professor',
  [USER_TYPES.STUDENT]: '/student',
  [USER_TYPES.COORDINATOR]: '/coordinator'
}

export const foundUserRedirect = (userType: USER_TYPES) => urls[userType] ?? '/not-found'

export const userHasPermissionToEnter = (userType: USER_TYPES, pathname: string) => {
  if (userType === USER_TYPES.ADMIN) return true

  if (userType === USER_TYPES.PROFESSOR && pathname.startsWith(urls[USER_TYPES.PROFESSOR])) return true

  if (userType === USER_TYPES.STUDENT && pathname.startsWith(urls[USER_TYPES.STUDENT])) return true

  if (userType === USER_TYPES.COORDINATOR && pathname.startsWith(urls[USER_TYPES.COORDINATOR])) return true

  return false
}
