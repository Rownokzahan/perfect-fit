import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomDressSelection from "./formComponents/CustomDressSelection";
import FabricSelection from "./formComponents/FabricSelection";
import MeasurementInputs from "./formComponents/MeasurementInputs";
import SpecialRequest from "./formComponents/SpecialRequest";
import AddToCartModal from "../modals/AddToCartModal";
import { ImSpinner9 } from "react-icons/im";
import { useAddToCartMutation } from "../../redux/features/api/cartApi";

const CustomDressForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    const item = {
      name: "Custom Dress",
      price: 50,
      image: "Custom Dress",
      ...data,
    }; //TODO: price should be dynamic

    addToCart({ userId: user?._id, item })
      .unwrap()
      .then(() => {
        reset();
        setIsModalOpen(true);
      })
      .catch((error) => console.error("rejected", error));
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <CustomDressSelection
          register={register}
          errors={errors}
          watch={watch}
        />
        <FabricSelection register={register} errors={errors} />
        <MeasurementInputs register={register} errors={errors} />
        <SpecialRequest register={register} />

        {/* Add to cart button */}
        {isLoading ? (
          <button
            type="button"
            className="button-black-solid w-full flex items-center justify-center gap-2"
            disabled
          >
            <ImSpinner9 className="animate-spin" />
          </button>
        ) : (
          <button type="submit" className="button-black-solid w-full">
            Add to Cart
          </button>
        )}
      </form>

      <AddToCartModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default CustomDressForm;
