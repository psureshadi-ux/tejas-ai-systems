import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 max-w-lg mx-auto px-4 text-center space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
        <Compass className="w-7 h-7" />
      </div>
      <h1 className="text-3xl font-black text-white tracking-tight">404 — Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
        The page or prototype you requested does not exist or has been moved.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-600/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Tejas AI Systems Home</span>
        </Link>
      </div>
    </div>
  );
}
