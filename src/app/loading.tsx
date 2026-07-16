"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center gap-4 px-4 bg-background">
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-divider/50 bg-content1/20 backdrop-blur-sm max-w-xs w-full shadow-sm">
        {/* HeroUI Premium Spinner Primitive */}
        <Spinner 
          color="primary" 
          size="lg" 
          labelColor="primary"
          className="scale-110"
        />
        
        {/* Subtle Supporting Label */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-foreground animate-pulse">
            Loading SkillHub...
          </p>
          <p className="text-xs text-foreground-400">
            Fetching secure platform assets
          </p>
        </div>
      </div>
    </div>
  );
}