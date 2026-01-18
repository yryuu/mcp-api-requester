import axios, { AxiosError } from 'axios';
export async function makeRequest(args) {
    const { url, method = 'GET', headers, params, body } = args;
    try {
        const response = await axios({
            url,
            method: method,
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
    }
    catch (error) {
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
