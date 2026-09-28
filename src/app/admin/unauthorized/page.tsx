export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-[#241920]">Unauthorized</h1>
      <p className="mt-2 text-gray-500">
        You do not have permission to access this page.
      </p>
      <a
        href="/admin"
        className="mt-6 rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936]"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
