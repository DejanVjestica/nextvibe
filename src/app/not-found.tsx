import { HomeButton } from "@/components/HomeButton";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-10 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p>This page does not exist.</p>
      <HomeButton></HomeButton>
    </div>
  );
}
