/**
 * Created by gustavo on 07/05/17.
 */
export class TokenInfo {

  createdTime: number;

  constructor() {
    this.createdTime = new Date().getTime();
  }

  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;

  isExpired(): boolean {
    let dataAtual = new Date();
    let dataExpiracao = new Date(this.createdTime + (this.expires_in * 1000));

    if (dataAtual > dataExpiracao) {
      return true;
    } else {
      return false;
    }
  }
}
