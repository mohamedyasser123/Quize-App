export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      <section className="w-1/2 flex items-center justify-center">
        {children}
      </section>

      <section className="w-1/2 bg-blue-600 flex items-center justify-center">
        <h1>Quiz App</h1>
      </section>
    </main>
  );
}