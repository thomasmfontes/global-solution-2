export default function Loader() {
  return (
    <div className="flex items-center justify-center p-8" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" aria-label="Carregando"></div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
