import { buildPageMetadata } from "@/lib/metadata";
import TaskClient from "@/components/TaskClient";

export const metadata = buildPageMetadata({
  title: "Tasks",
  description: "Interview practice tasks — todo list, user search, and array utilities.",
  pathname: "/task",
});

export default function TaskPage() {
  return <TaskClient />;
}