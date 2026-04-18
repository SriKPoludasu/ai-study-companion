import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  noteUploader: f({
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    text: { maxFileSize: "2MB", maxFileCount: 1 }
  })
    .middleware(async () => ({ uploadedBy: "authenticated-user" }))
    .onUploadComplete(async ({ file, metadata }) => ({
      url: file.url,
      name: file.name,
      uploadedBy: metadata.uploadedBy
    }))
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
