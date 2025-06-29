import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <SignUp path="/sign-up" />
    </div>
  );
}
