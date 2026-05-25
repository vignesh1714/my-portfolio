import { buildPageMetadata } from "@/lib/metadata";
import PlaygroundClient from "@/components/PlaygroundClient";

export const metadata = buildPageMetadata({
  title: "JS Playground",
  description: "Interactive JavaScript playground — write code and see live output in the browser.",
  pathname: "/playground",
});

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
