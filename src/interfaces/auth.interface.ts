export interface IAuthResponse {
  token: string
  user: IAuthUser
}

export interface IAuthUser {
  id: string
  name: string
  email: string
  role: string
}
