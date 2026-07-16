import Banner from "@/Components/Banner";
import CategoryCard from "@/Components/CategoryCard";
import FeaturedCourses from "@/Components/FeaturedCourses";


export default function Home() {
  return (
    <main className="flex min-h-[75vh] w-full flex-col items-center justify-start px-6 py-16 text-center sm:py-24 lg:px-8 bg-background gap-12">
      {/* ১. হিরো ব্যানার */}
      <Banner />
      
      {/* ২. স্বয়ংসম্পূর্ণ ক্যাটাগরি প্যানেল */}
      <CategoryCard />

     <FeaturedCourses />
    </main>
  );
}