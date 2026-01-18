
import axios, { Method, AxiosError } from 'axios';

// Type definitions for the tool invocation
export interface MakeRequestArgs {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
}

export async function makeRequest(args: MakeRequestArgs): Promise<string> {
    const { url, method = 'GET', headers, params, body } = args;

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
