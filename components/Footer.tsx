export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 px-6 py-6 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} EpoxyMetrics.com — The Epoxy Flooring Job Board
    </footer>
  );
}