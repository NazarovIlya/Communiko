export default class AuthRepository {
  token: string | null = localStorage.getItem('user-jwt');

  setToken = (token: string | null) => {
    if (token) localStorage.setItem('user-jwt', token)
    this.token = token;
  }
}