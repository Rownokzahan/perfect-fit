"use client";

import clsx from "clsx";
import useQueryParams from "@/hooks/useQueryParams";
import {
  MdDoNotDisturb,
  MdDeleteOutline,
  MdCheckCircle,
} from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

const tabs = [
  { label: "All", value: "all", Icon: RiFileList2Line },
  { label: "Active", value: "active", Icon: MdCheckCircle },
  { label: "Inactive", value: "inactive", Icon: MdDoNotDisturb },
  { label: "Deleted", value: "archived", Icon: MdDeleteOutline },
];

const ProductsTabs = () => {
  const { queryParams, setQueryParam } = useQueryParams();

  const currentStatus = queryParams.get("status") || "all";

  return (
    <div className="flex-1 overflow-x-auto h-full flex items-center gap-2 md:gap-3">
      {tabs.map((tab) => {
        const isActive = currentStatus === tab.value;
        const Icon = tab.Icon;

        return (
          <button
            key={tab.value}
            onClick={() => setQueryParam("status", tab.value)}
            className={clsx(
              "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200",
              isActive
                ? "bg-primary/90 text-white"
                : "text-dark-light hover:text-dark",
            )}
          >
            <Icon className="text-base shrink-0" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProductsTabs;
