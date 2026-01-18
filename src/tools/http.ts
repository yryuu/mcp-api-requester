
import axios, { Method, AxiosError } from 'axios';

// Type definitions for the tool invocation
export interface MakeRequestArgs {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
    cookies?: Record<string, string>;
}

export async function makeRequest(args: MakeRequestArgs): Promise<string> {
    const { url, method = 'GET', headers: initialHeaders, params, body, cookies } = args;

    const headers = { ...initialHeaders };

    // Process cookies if provided
    if (cookies) {
        const cookieString = Object.entries(cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ');

        if (cookieString) {
            // If Cookie header already exists, append to it (though usually it's one or the other)
            if (headers['Cookie']) {
                headers['Cookie'] = `${headers['Cookie']}; ${cookieString}`;
            } else {
                headers['Cookie'] = cookieString;
            }
        }
    }

    try {
        const response = await axios({
            url,
            method: method as Method,
            headers,
            params,
            data: body,
            validateStatus: () => true, // resolve promise for all status codes
        });

        const result = {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
        };

        return JSON.stringify(result, null, 2);
    } catch (error) {
        if (error instanceof AxiosError) {
            return JSON.stringify({
                error: error.message,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data
                } : undefined
            }, null, 2);
        }
        return JSON.stringify({ error: String(error) }, null, 2);
    }
}
