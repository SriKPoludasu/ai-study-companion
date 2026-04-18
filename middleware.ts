import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin"
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/workspace/:path*", "/flashcards/:path*", "/quiz/:path*"]
};
