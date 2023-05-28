import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwt: string = '';

  setJwt(value: string) {
    this.jwt = value;
  }

  getJwt(): string {
    return this.jwt;
  }
}
