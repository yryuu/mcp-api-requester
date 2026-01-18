
import { makeRequest } from '../src/tools/http';

async function test() {
    console.log('--- Testing GET Request ---');
    const getResult = await makeRequest({
        url: 'https://httpbin.org/get',
        params: { test: '123' }
    });
    console.log(getResult);

    console.log('\n--- Testing POST Request ---');
    const postResult = await makeRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar' },
        body: { message: 'Hello World' }
    });
    console.log(postResult);

    // Verify error handling
    console.log('\n--- Testing 404 Request ---');
    const notFoundResult = await makeRequest({
        url: 'https://httpbin.org/status/404'
    });
    console.log(notFoundResult);

    console.log('\n--- Testing Cookie Request ---');
    const cookieResult = await makeRequest({
        url: 'https://httpbin.org/cookies',
        cookies: {
            'session_id': '12345',
            'user_pref': 'dark_mode'
        }
    });
    console.log(cookieResult);
}

test().catch(console.error);
