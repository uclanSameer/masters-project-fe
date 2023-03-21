import { Response } from "@/model/response";
import { parse } from "cookie";

export function fetcherWithToken<T>(
    url: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    body?: unknown,
    token?: string
): Promise<Response<T>> {

    method = method || 'GET';
    token = token || getTokenFromCookie();
    const reqObject: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    if (method !== 'GET' && body) {
        reqObject.body = JSON.stringify(body);
    }
    return fetch(url, reqObject)
        .then((res) => {
            if (res.ok) {

                return res.json() as Promise<Response<T>>;
            }

            if (res.status === 401) {
                throw new Error('Unauthorized');
            }
            throw new Error();
        });

}





export const GET = <T>(url: string) => {
    return fetcherWithToken<T>(url, 'GET');
}

export const GetWithToken = <T>(url: string, token: string) => {
    return fetcherWithToken<T>(url, 'GET', {}, token);
}

export const POST = <T>(url: string, body: unknown) => {
    return fetcherWithToken<T>(url, 'POST', body);
}

export const PostWithToken = <T>(url: string, body?: unknown, token?: string) => {
    return fetcherWithToken<T>(url, 'POST', body, token);
}

export const PUT = <T>(url: string, body: unknown) => {
    return fetcherWithToken<T>(url, 'PUT', body);
}

export const DELETE = (url: string, body: unknown) => {
    return fetcherWithToken(url, 'DELETE', body);
}


export const getTokenFromCookie = () => {
    if (typeof window === 'undefined') {
        return '';
    }
    const cookie = window.document.cookie;
    const cookies = parse(cookie || '');
    return cookies.token;
}