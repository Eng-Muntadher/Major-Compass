export function Logo() {
  return (
    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
        <span className="text-2xl">🎓</span>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg leading-tight">Major Compass</h1>
        <p className="text-xs text-gray-500 leading-tight">
          Explore Your Future
        </p>
      </div>
    </button>
  );
}
