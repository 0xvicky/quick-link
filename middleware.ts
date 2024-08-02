import {NextResponse, NextRequest} from "next/server";
import {getToken} from "next-auth/jwt";
export {default} from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({req: request});

  const url = request.nextUrl;

  if (token && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!token && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
export const config = {
  matcher: ["/auth", "/"]
};
