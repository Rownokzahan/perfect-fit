import { BiSolidCategory } from "react-icons/bi";
import { BsFillBoxFill } from "react-icons/bs";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IconType } from "react-icons";

export interface AdminMenuLinkType {
  name: string;
  Icon: IconType;
  path: string;
}

export interface AdminSubMenuItemType {
  name: string;
  path: string;
}

export interface AdminMenuGroupType extends AdminMenuLinkType {
  subItems: AdminSubMenuItemType[];
}
export type AdminMenuType = AdminMenuLinkType | AdminMenuGroupType;

export const isGroupItem = (item: AdminMenuType): item is AdminMenuGroupType =>
  "subItems" in item;

export const adminMenu: AdminMenuType[] = [
  {
    name: "Dashboard",
    Icon: FaHome,
    path: "/admin/dashboard",
  },
  {
    name: "Categories",
    Icon: BiSolidCategory,
    path: "/admin/categories",
  },
  {
    name: "Products",
    Icon: FaShoppingBag,
    path: "/admin/products",
    subItems: [
      {
        name: "Add Product",
        path: "/admin/products/add",
      },
      {
        name: "All Products",
        path: "/admin/products",
      },
    ],
  },
  {
    name: "Orders",
    Icon: BsFillBoxFill,
    path: "/admin/orders",
  },
  {
    name: "Customers",
    Icon: FaUserGroup,
    path: "/admin/customers",
  },
];

// Helper function to get page name from pathname
export const getPageNameFromPath = (pathname: string): string => {
  for (const item of adminMenu) {
    if (pathname === item.path || pathname.startsWith(item.path + "/")) {
      // Check sub-items first for exact match
      if (isGroupItem(item)) {
        for (const subItem of item.subItems) {
          if (pathname === subItem.path) {
            return subItem.name;
          }
        }
      }
      return item.name;
    }
  }
  return "Dashboard";
};
