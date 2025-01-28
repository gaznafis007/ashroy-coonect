import Link from "next/link";
import Button from "../Button/Button";

export const UnauthenticatedMessage = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <h2 className="text-2xl font-bold text-yellow-600 mb-4">Access Denied</h2>
    <p className="text-gray-600 mb-4">Please log in to view your dashboard.</p>
    <Link href={"/login"}>
      <Button>Log In</Button>
    </Link>
  </div>
);
