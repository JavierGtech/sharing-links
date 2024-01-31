import { adminAuth } from "$lib/server/admin";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get("__session");

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    event.locals.userID = decodedClaims.uid;
    console.log("found user id", decodedClaims.uid);
  } catch (e) {
    event.locals.userID = null;
    return resolve(event);
  }

  // const response = await resolve(event);

  // // Set CORS headers
  // response.headers.set('Access-Control-Allow-Origin', 'https://yourfrontenddomain.com'); // Replace with your actual frontend domain
  // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // return response;


  return resolve(event);
}) satisfies Handle;