export class AuthDTO {
    public code?: string;
}

export class AuthTokenDTO {
    public accessToken: string;
    public refreshToken: string;
} 

export class AuthTokenResponse extends AuthTokenDTO {}