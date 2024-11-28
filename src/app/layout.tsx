import "~/styles/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FE Quiz",
  description: "Quiz generator for studying CS triva",
};

const NavBar = () => {
  // const user = useUser();

  return (
    <nav className="flex gap-4 border-b border-slate-400 p-4">
      <div>
        {/* {!user.isSignedIn ? (
          <div className="flex justify-center">
            <SignInButton />{" "}
          </div>
        ) : (
          <div className="flex justify-center">
            <SignOutButton />
          </div>
        )} */}
      </div>
      <div className="flex justify-center">
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/create">Create Question</Link>
      </div>
      {/* {user?.user?.organizationMemberships?.[0]?.role === "admin" ? (
        <div>
          <Link href="/create">Create Question</Link>
        </div>
      ) : null} */}
    </nav>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <title>FE Quiz</title>
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
