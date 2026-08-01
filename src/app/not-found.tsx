import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles, Gift, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Card variant="glass" className="max-w-md w-full p-8 text-center space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center mx-auto">
          <Gift className="w-8 h-8 opacity-60" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-bold">404 - Link Not Found</span>
          <h1 className="text-3xl font-extrabold text-white">Wish Page Missing or Expired</h1>
          <p className="text-sm text-slate-400">
            This birthday surprise link doesn't exist, has been removed by the creator, or was entered incorrectly.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link href="/create">
            <Button variant="gradient" size="lg" className="w-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Create a New Birthday Wish
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="md" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
