import ViewCourse from "@/Components/ViewCourse";

interface PageProps {
  params: Promise<{ id: string }>; // 👈 params এখন Promise
}

export default async function CourseDetailsPage({ params }: PageProps) {
  // 👈 এখানে params-কে await করে id-টি destructure করে নেওয়া হয়েছে
  const { id } = await params; 

  console.log("Received params.id:", id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`, // 👈 params.id এর জায়গায় id
    {
      cache: "no-store",
    }
  );
  
  console.log("res data", res);

  if (!res.ok) {
    throw new Error("Failed to fetch course data");
  }

  const course = await res.json();

  // API ডেটাকে ViewCourse-এর কাঙ্ক্ষিত ফরম্যাটে রূপান্তর
  const courseData = {
    id: course.id || course._id,
    title: course.title,
    subtitle: course.description || "Explore the full course curriculum and master essential skills.",
    instructor: course.instructor,
    instructorRole: "Senior Instructor & Industry Expert",
    rating: course.rating || 4.5,
    reviewsCount: course.students || 120,
    price: course.price,
    originalPrice: Math.round(course.price * 1.5),
    category: course.category,
    level: course.level,
    duration: course.duration || "8 Weeks",
    lectures: course.lessons || 30,
    gallery: [
      course.imageUrl,
      course.imageUrl, 
      course.imageUrl,
    ],
    features: [
      "Lifetime access to all course materials",
      "Certificate of completion",
      "Downloadable resources & source code",
      "Practical projects & real-world examples",
      "Community support & Q&A",
    ],
    curriculum: [
      { chapter: "Introduction to Core Concepts", duration: "2 hrs" },
      { chapter: "Advanced Techniques & Best Practices", duration: "4 hrs" },
      { chapter: "Hands-on Project Development", duration: "3 hrs" },
      { chapter: "Deployment & Optimization", duration: "2 hrs" },
      { chapter: "Final Assessment & Certification", duration: "1 hr" },
    ],
    related: [], 
  };

  return <ViewCourse courseData={courseData} />;
}