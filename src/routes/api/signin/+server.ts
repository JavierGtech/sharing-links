import { adminAuth } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {

    console.log('I got here, step 1');

    // const { idToken } = await request.json();

    // const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    // const decodedIdToken = await adminAuth.verifyIdToken(idToken);

    // if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    //     const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    //     const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

    //     console.log('I got here, step 2, and this is the cookie: ', cookie);
    //     cookies.set('__session', cookie, options);

    //     return json({ status: 'signedIn' });
    // } else {
    //     throw error(401, 'Recent sign in required!');
    // }

    try {
        const { idToken } = await request.json();
    
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    
        const decodedIdToken = await adminAuth.verifyIdToken(idToken);
    
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
            const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
            const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
    
            console.log('I got here, step 2, and this is the cookie: ', cookie);
            cookies.set('__session', cookie, options);
    
            return json({ status: 'signedIn' });
        } else {
            throw error(401, 'Recent sign in required!');
        }
    } catch (err: any) {
        console.error(err);
        // Handle error here, for example, you might want to return a response with an error status code and message
        return json({ status: 'error', message: err.message });
    }

};

export const DELETE: RequestHandler = async ({ cookies }) => {
    cookies.delete('__session', { path: '/' });
    return json({ status: 'signedOut' });
}