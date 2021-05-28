import { basicAuth } from "./mod.ts";

addEventListener("fetch", (e) => {
  const unauthorized = basicAuth(e.request, "Access to my site", {
    "user": "password",
  });
  if (unauthorized) {
    e.respondWith(unauthorized);
    return;
  }
  e.respondWith(new Response("Your are authorized!"));
});
