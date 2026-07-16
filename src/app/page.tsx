import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken");
  const userCookie = cookieStore.get("user");

  if (!token || !userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

 if (user.role === "Instructor") {
  redirect("/dashboard");
}

if (user.role === "Student") {
  redirect("/quizzes"); 
}
  redirect("/login");
}
