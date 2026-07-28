import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/content";
import { flattenLessons } from "@/content/types";
import { LessonViewer } from "@/components/learn/lesson-viewer";

export function generateStaticParams() {
  return COURSES.flatMap((course) =>
    flattenLessons(course).map(({ lesson }) => ({
      courseSlug: course.slug,
      lessonSlug: lesson.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = course
    ? flattenLessons(course).find((f) => f.lesson.slug === lessonSlug)
    : undefined;
  if (!course || !lesson) return {};
  return {
    title: `${lesson.lesson.title} — ${course.title}`,
    description: course.subtitle,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();
  const exists = flattenLessons(course).some((f) => f.lesson.slug === lessonSlug);
  if (!exists) notFound();

  return <LessonViewer course={course} lessonSlug={lessonSlug} />;
}
