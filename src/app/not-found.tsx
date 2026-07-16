"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiHome, FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-[75vh] w-full flex-col items-center justify-center px-6 py-16 text-center sm:py-24 lg:px-8">
      <div className="space-y-6 max-w-md mx-auto">
        
        {/* Visual Indicator/Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger animate-bounce duration-1000">
          <FiAlertTriangle size={28} />
        </div>

        {/* Error Typography */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-4">
            Page not found
          </h2>
          <p className="mt-2 text-base text-foreground-500 leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or perhaps the URL contains a typo.
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Go Back to Previous URL */}
          <Button
            onClick={() => router.back()}
            variant="flat"
            radius="xl"
            startContent={<FiArrowLeft size={16} />}
            className="w-full sm:w-auto font-medium text-foreground hover:bg-content2"
          >
            Go Back
          </Button>

          {/* Go to Dashboard or Home */}
          <Button
            as={NextLink}
            href="/"
            color="primary"
            variant="solid"
            radius="xl"
            startContent={<FiHome size={16} />}
            className="w-full sm:w-auto font-semibold shadow-sm"
          >
            Back to Home
          </Button>
        </div>
        
      </div>
    </main>
  );
}