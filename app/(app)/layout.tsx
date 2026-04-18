import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { authOptions } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,hsl(var(--background)),hsl(var(--secondary))_70%,rgba(20,184,166,0.12))]">
      <div className="mx-auto flex w-full max-w-[1440px]">
        <AppSidebar user={session.user} />
        <main className="min-w-0 flex-1 px-4 py-4 md:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
