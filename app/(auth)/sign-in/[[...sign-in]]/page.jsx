import { SignIn } from "@clerk/nextjs";
export default function Page(){
  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light"><SignIn path="/sign-in"/></div>
)}