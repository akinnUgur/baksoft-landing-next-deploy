export default function HomePage() {
  return (
    <main className="min-h-screen p-8 bg-primary text-text dark:bg-primary-dark dark:text-text-dark transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Tailwind Renk Testi</h1>

      {/* Tailwind varsayılanı (red) */}
      <div className="bg-red-500 text-white p-4 rounded mb-4">
        Bu kutu görünüyorsa Tailwind kurulumu doğru.
      </div>

    </main>
  );
}
