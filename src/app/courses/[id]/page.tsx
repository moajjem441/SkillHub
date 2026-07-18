import React from "react";
import ViewCourses from "@/Components/ViewCourses";

export const metadata = {
  title: "Course Details - Learn Today",
  description: "Explore structural modules, hands-on labs, detailed curriculum, and instructor profiles.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <ViewCourses courseId={resolvedParams.id} />
      
    </main>
  );
}