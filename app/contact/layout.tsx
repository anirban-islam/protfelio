import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Anirban Islam Emon",
  description:
    "Contact Anirban Islam Emon — Full Stack Developer from Bangladesh specializing in modern web technologies like Next.js, React, Node.js, and MongoDB.",
  keywords:
    "Contact Islam Emon, Contact, Full Stack Developer, Web Developer Bangladesh, React, Next.js, Node.js",
};

export default function ContactLayout({
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
