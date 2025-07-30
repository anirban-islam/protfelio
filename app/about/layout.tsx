import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Anirban Islam Emon",
  description:
    "About Anirban Islam Emon — Full Stack Developer from Bangladesh specializing in modern web technologies like Next.js, React, Node.js, and MongoDB.",
  keywords:
    "Anirban Islam Emon, About, Full Stack Developer, Web Developer Bangladesh, React, Next.js, Node.js",
};

export default function AboutLayout({
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
