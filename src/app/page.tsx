import Banner from "@/Components/Banner";
import CallToAction from "@/Components/CallToAction";
import CategoryCard from "@/Components/CategoryCard";
import CoursesExplore from "@/Components/CoursesExplore";
import Faq from "@/Components/Faq";
import FeaturedCourses from "@/Components/FeaturedCourses";
import Newsletter from "@/Components/Newsletter";
import Statistics from "@/Components/Statistics";
import Testimonials from "@/Components/Testimonials";
import ViewCourses from "@/Components/ViewCourses";


export default function Home() {
  return (
    <main className="flex min-h-[75vh] w-full flex-col items-center justify-start px-6 py-16 text-center sm:py-24 lg:px-8 bg-background gap-12">
      {/* ১. হিরো ব্যানার */}
      <Banner />
      
      {/* ২. স্বয়ংসম্পূর্ণ ক্যাটাগরি প্যানেল */}
      <CategoryCard />

     <FeaturedCourses />

     <Statistics />

     <Testimonials />

     <Faq></Faq>

    <Newsletter></Newsletter>

    <CallToAction></CallToAction>

    <CoursesExplore></CoursesExplore>

    <ViewCourses></ViewCourses>

    </main>
  );
}