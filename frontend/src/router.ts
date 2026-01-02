const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages",
  origin: "http://localhost:3000",
  assetPrefix: "_next/static/"
});

router.match("/")
//
{
  filePath: "./index.tsx",
  kind: "exact",
  name: "/",
  pathname: "/",
  src: "https://mydomain.com/_next/static/pages/index.tsx"
}