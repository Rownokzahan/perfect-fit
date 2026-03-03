"use client";

import Modal from "./Modal";
import Button from "../ui/Button";
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import useModalById from "@/hooks/useModalById";
import { resolveConfirmActionModal } from "@/hooks/useConfirmActionModal";
import { ActionType } from "@/types/modal";
import { IconType } from "react-icons";
import { TbShoppingBagX } from "react-icons/tb";

const ACTION_CONFIG: Record<
  ActionType,
  {
    Icon: IconType;
    label: string;
  }
> = {
  delete: {
    Icon: LuTrash2,
    label: "Delete",
  },
  restore: {
    Icon: LuArchiveRestore,
    label: "Restore",
  },
  clearCart: {
    Icon: TbShoppingBagX,
    label: "Clear Cart",
  },
};

const ConfirmActionModal = () => {
  const { modalData, closeModal } = useModalById("confirmActionModal");

  const { message, action } = modalData || {};

  const handleCancel = () => {
    resolveConfirmActionModal(false);
    closeModal();
  };

  const handleConfirm = () => {
    resolveConfirmActionModal(true);
    closeModal();
  };

  const { Icon, label } = ACTION_CONFIG[action];

  return (
    <Modal
      modalId="confirmActionModal"
      containerClasses="!max-w-sm py-6 px-4 sm:p-8"
    >
      <Icon size={36} className="mb-4 mx-auto" />

      <p className="text-center text-dark-light">{message}</p>

      <div className="mt-5 flex flex-row gap-3">
        <Button
          onClick={handleCancel}
          variant="dark-outline"
          className="w-full text-sm sm:text-base"
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="primary"
          className="w-full text-sm sm:text-base"
        >
          {label}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmActionModal;
