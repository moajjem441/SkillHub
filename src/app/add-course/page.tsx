import React from "react";
import AddCourseForm from "@/Components/AddCourseForm";

export const metadata = {
  title: "Add New Course | Admin Dashboard",
  description: "Add a new course to the SkillHub catalog.",
};

export default function AddCoursePage() {
  return <AddCourseForm />;
}