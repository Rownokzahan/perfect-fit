import { useCallback } from "react";
import useModalById from "./useModalById";
import { ActionType } from "@/types/modal";

let resolver: ((value: boolean) => void) | null = null;

export const useConfirmActionModal = () => {
  const { openModalWithData } = useModalById("confirmActionModal");

  const confirm = useCallback(
    ({
      message,
      action,
    }: {
      message: string;
      action: ActionType;
    }): Promise<boolean> => {
      return new Promise((resolve) => {
        resolver = resolve;
        openModalWithData({ message, action });
      });
    },
    [openModalWithData],
  );

  return confirm;
};

export const resolveConfirmActionModal = (value: boolean) => {
  if (resolver) {
    resolver(value);
    resolver = null;
  }
};
