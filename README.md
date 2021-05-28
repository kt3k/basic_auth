# basic_auth v1.0.0

Module for performing Basic Auth in Deno Deploy.

[Demo](https://basic-auth-demo.deno.dev/)

# Usage

import `basicAuth` function from the module url and use it like the below:

```ts
import { basicAuth } from "https://deno.land/x/basic_auth@v1.0.0/mod.ts";

addEventListener("fetch", (e) => {
  const unauthorized = basicAuth(e.request, "Access to my site", { "user": "password" });
  if (unauthorized) {
    e.respondWith(unauthorized);
    return;
  }
  e.respondWith(new Response("Your are authorized!"));
});
```

Replace `user` and `password` part with your credentials. You can also set multiple credentials by setting multiple key value pairs in the 3rd parameter.

# LICENSE

MIT
