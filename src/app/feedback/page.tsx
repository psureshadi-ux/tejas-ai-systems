"use client";

import { useState } from "react";
import { Star, CheckCircle2, ArrowRight } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  const [clientName, setClientName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !feedbackText) return;

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          rating,
          npsScore,
          feedbackText,
          allowPublicTestimonial: true,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Client Success</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Has Your 24/7 AI Engine Performed?
        </h1>
        <p className="text-xs text-slate-400">
          Your feedback helps our engineering team optimize conversation quality and booking accuracy.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {submitted ? (
          <div className="text-center space-y-4 py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-lg font-bold text-white">Thank You for Your Feedback!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              We appreciate your partnership with Tejas AI Systems.
            </p>
            {rating >= 4 && (
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-md"
              >
                <span>Share Review on Google</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-bold text-slate-300 mb-1">Your Name & Clinic/Venture *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. K. Srinivasulu (SV Dental Care)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Overall Satisfaction</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2 font-semibold">({rating} of 5 Stars)</span>
              </div>
            </div>

            {/* NPS 0-10 */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                How likely are you to recommend Tejas AI to a peer? (0 = Unlikely, 10 = Highly Likely)
              </label>
              <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNpsScore(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                      npsScore === num
                        ? "bg-cyan-500 text-slate-950 shadow-md font-extrabold"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Your Detailed Feedback & Suggestions *</label>
              <textarea
                required
                rows={3}
                placeholder="What has been the biggest benefit? (e.g. More evening appointments booked, less phone calls)"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              <span>{loading ? "Submitting..." : "Submit Client Feedback"}</span>
            </button>

          </form>
        )}
      </div>

    </div>
  );
}
