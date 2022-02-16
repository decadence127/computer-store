export interface RefreshTokenData {
  refreshToken: string;
}
export interface DatabaseUserTokenData extends RefreshTokenData {
  userId: number;
}
export interface TokenData extends RefreshTokenData {
  accessToken: string;
}
