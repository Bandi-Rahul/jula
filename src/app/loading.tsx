export default function Loading() {
  return (
    <div className="loading-page wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <p>Preparing the page...</p>
    </div>
  );
}
