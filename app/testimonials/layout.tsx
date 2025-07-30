import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Anirban Islam Emon",
  description:
    "Testimonials Anirban Islam Emon — Full Stack Developer from Bangladesh specializing in modern web technologies like Next.js, React, Node.js, and MongoDB.",
  keywords:
    "Testimonials Islam Emon, Testimonials, Full Stack Developer, Web Developer Bangladesh, React, Next.js, Node.js",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
        {children}
    </div>
  );
}
