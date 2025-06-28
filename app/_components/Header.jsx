"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-light shadow-sm">
      {/* <div className="d-flex align-items-center">
        // {/* <Image src="/formify.webp" height={40} width={40} className="rounded-circle" alt="logo"/> */}
        <h4 className="m-0 fw-bold text-primary px-2">GenFORM</h4>
    
      

      <div className="d-flex align-items-center gap-3">
        {isSignedIn ? (
          <>
            <Link href={'/dashboard'}>
            <button className="btn btn-outline-primary">Dashboard</button>
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "rounded-circle",
                },
              }}
            />
          </>
        ) : (
          <SignInButton><button className="btn btn-primary">Get Started</button></SignInButton>
        )}
      </div>
    </header>
  );
}
