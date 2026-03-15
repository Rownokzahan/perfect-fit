import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} prefetch={false}>
      <h3 className="text-2xl whitespace-nowrap space-x-2">
        <span>Perfect</span>
        <span>Fit</span>
      </h3>
    </Link>
  );
};

export default Logo;

