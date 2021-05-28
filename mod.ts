/**
 * Authenticates the given request with the given user-password table.
 * Returns unauthorized response if the request is not authenticated, otherwise
 * returns undefined.
 */
export function basicAuth(
  request: Request,
  realm: string,
  userPasswordTable: Record<string, string>,
): Response | undefined {
  const authorization = request.headers.get("authorization");
  if (authorization) {
    const match = authorization.match(/^Basic\s+(.*)$/);
    if (match) {
      const [user, pw] = atob(match[1]).split(":");
      for (const [u, p] of Object.entries(userPasswordTable)) {
        if (user === u && pw == p) {
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
