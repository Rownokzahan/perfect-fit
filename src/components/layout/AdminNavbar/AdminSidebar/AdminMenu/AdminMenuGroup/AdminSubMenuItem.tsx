import clsx from "clsx";
import Link from "next/link";
import { AdminSubMenuItemType } from "../adminMenu";

interface AdminSubMenuItemProps {
  subItem: AdminSubMenuItemType;
  isActive: boolean;
}

const AdminSubMenuItem = ({ subItem, isActive }: AdminSubMenuItemProps) => {
  const { path, name } = subItem;

  return (
    <li
      className={clsx(
        "border-s-2 transition-colors",
        isActive ? "border-primary" : "border-muted",
      )}
    >
      <Link
        href={path}
        prefetch={false}
        className={clsx(
          "block py-2 px-3 transition-colors",
          isActive && "text-primary",
        )}
      >
        {name}
      </Link>
    </li>
  );
};

export default AdminSubMenuItem;
