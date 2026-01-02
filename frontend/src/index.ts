import { serve } from "bun";
import index from "./index.html";
import { SignUp } from "./components/Signup";
import { SignIn } from "./components/Signin";
import { renderToString } from "react-dom/server";
import RBACAuthSystem from "./components/login";

const server = serve({
  routes: {
    "/": index,
    "/signup": {
      GET() {
        const html = renderToString(typeof RBACAuthSystem);

        return new Response(`
      <!doctype html>
      <html>
        <body>
          <div id="root">${html}</div>
        </body>
      </html>
    `, {
          headers: { "Content-Type": "text/html" },
        });
      },
    },
    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
