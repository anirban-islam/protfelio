import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project | Anirban Islam Emon",
  description:
    "Project Anirban Islam Emon — Full Stack Developer from Bangladesh specializing in modern web technologies like Next.js, React, Node.js, and MongoDB.",
  keywords:
    "Project Islam Emon, Project, Full Stack Developer, Web Developer Bangladesh, React, Next.js, Node.js",
};

export default function ProjectLayout({
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
