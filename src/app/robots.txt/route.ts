

export const runtime = "edge";

export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://www.baksoft.com/sitemap.xml
  `,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
