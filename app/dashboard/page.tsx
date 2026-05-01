import { getIssues } from "@/lib/dal";

export default async function Dashboard() {
  const issues = await getIssues();
  console.log(issues);

  return <div>Hello from Dashboard</div>;
}
