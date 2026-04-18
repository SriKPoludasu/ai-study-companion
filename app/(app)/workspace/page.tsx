import { MotionShell } from "@/components/motion-shell";
import { WorkspaceClient } from "@/components/workspace-client";

export default function WorkspacePage() {
  return (
    <MotionShell className="space-y-6 pt-14 lg:pt-0">
      <div>
        <p className="text-sm font-medium text-primary">Study workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Notes, uploads, and AI help</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Create subjects, organize notes, search instantly, and transform raw material into practice.</p>
      </div>
      <WorkspaceClient />
    </MotionShell>
  );
}
