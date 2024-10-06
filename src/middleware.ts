import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

function handler(){
  console.log("Hello from handler");
}

handler();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};