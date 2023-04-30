import { parse } from "cookie";
import { IncomingMessage, ServerResponse } from "http";




export class GeneralUtils {

    private constructor() {
        throw new Error('GeneralUtils is a static class and cannot be instantiated');
    }

    public static validateUKPostalCode(postalCode: string): boolean {
        const ukPostalCodePattern = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? [0-9][A-Za-z]{2}|GIR 0AA)$/;
        return ukPostalCodePattern.test(postalCode);
    }

    // check cookie for user session and invalidate if not valid for given role
    public static invalidateUserSession(
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage>,
        role: string) {
        const cookies = parse(req.headers.cookie || '')
        if (cookies.role !== role) {
            const newCookies = GeneralUtils.removeLoggedInDetailsFromCookies(cookies);
            res.setHeader('Set-Cookie', GeneralUtils.serializeCookies(newCookies));
            res.writeHead(302, { Location: '/login' });
            res.end();
        }
        return cookies['token'];
    }

    public static invalidateUserSessionIfNotLoggedIn(){

    }

    private static serializeCookies(cookies: Record<string, string>) {
        return Object.keys(cookies).map(key => `${key}=${cookies[key]}`);
    }


    private static removeLoggedInDetailsFromCookies(cookies: Record<string, string>) {
        cookies.loggedIn = 'false';
        cookies.role = '';
        cookies.address = '';
        cookies.token = '';
        return cookies;
    }

}