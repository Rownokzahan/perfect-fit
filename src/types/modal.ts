type ModalState<Data = null> = {
  isOpen: boolean;
  data: Data;
};

export type ActionType = "delete" | "restore" | "clearCart";

export interface ModalsState {
  authModal: ModalState;
  addToCartModal: ModalState;
  confirmClearCartModal: ModalState;
  orderSuccessModal: ModalState;
  confirmDeleteModal: ModalState<{ message: string }>;
  confirmLogoutModal: ModalState;
  confirmActionModal: ModalState<{
    message: string;
    action: ActionType;
  }>;
}

export type ModalId = keyof ModalsState;
