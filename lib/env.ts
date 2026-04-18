export function hasDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  return Boolean(url && !url.includes("USER:PASSWORD") && !url.includes("localhost:5432/ai_study_companion"));
}
