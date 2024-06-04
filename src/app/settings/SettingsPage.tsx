import SettingsForm from "@/components/SettingsForm";

export default function SettingsPage() {
  return (
    <main className="px-3 py-10">
      <section className="mx-auto space-y-6 max-w-7xl">
        <h1 className="text-3xl font-bold">Settings</h1>
        <SettingsForm />
      </section>
    </main>
  );
}
