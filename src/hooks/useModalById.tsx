import { useModalsStateStore } from "@/stores/useModalsStateStore";
import { ModalId, ModalsState } from "@/types/modal";

const useModalById = <T extends ModalId>(modalId: T) => {
  const modal = useModalsStateStore((state) => state[modalId]);
  const actions = useModalsStateStore((state) => state.actions);

  const { openModalById, closeModalById } = actions;

  const openModal = () => openModalById(modalId, null);
  const openModalWithData = (data: ModalsState[T]["data"]) =>
    openModalById(modalId, data);

  const closeModal = () => closeModalById(modalId);

  return {
    isModalOpen: modal.isOpen,
    modalData: modal.data as ModalsState[T]["data"], // This forces the type
    openModal,
    openModalWithData,
    closeModal,
  };
};

export default useModalById;
