import Link from "next/link";

const notFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href='/'>Back to Home</Link>
    </div>
  );
}

export default notFound;