import secureCompare from "https://deno.land/x/secure_compare@1.0.0/mod.ts";

interface MapWithGettableValues {
  get(headerName: string): string;
}

interface Requestlike {
  headers: MapWithGettableValues;
}

/**
 * Authenticates the given request with the given user-password table.
 * Returns unauthorized response if the request is not authenticated, otherwise
 * returns undefined.
 *
 * ```
 * import { basicAuth } from "https://deno.land/x/basic_auth@v1.0.0/mod.ts";
 *
 * addEventListener("fetch", (e) => {
 *   const unauthorized = basicAuth(e.request, "Access to my site", {
 *     "user": "password",
 *   });
 *   if (unauthorized) {
 *     e.respondWith(unauthorized);
 *     return;
 *   }
 *   e.respondWith(new Response("You are authorized!"));
 * });
 * ```
 */
export function basicAuth(
  request: Requestlike,
  realm: string,
  userPasswordTable: Record<string, string>,
): Response | undefined {
  const authorization = request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Basic\s+(.*)$/);
    if (match) {
      const [user, pw] = atob(match[1]).split(":");
      if (Object.prototype.hasOwnProperty.call(userPasswordTable, user)) {
        const expectedPw = userPasswordTable[user];
        if (secureCompare(pw, expectedPw)) {
          return;
        }
      }
    }
  }

  return new Response("401 Unauthorized", {
    status: 401,
    statusText: "Unauthorized",
    headers: {
      "www-authenticate": `Basic realm="${realm}"`,
    },
  });
}
