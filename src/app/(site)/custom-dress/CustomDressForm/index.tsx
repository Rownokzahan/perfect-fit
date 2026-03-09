"use client";

import MeasurementInputsSection from "@/components/forms/components/customize/MeasurementInputsSection";
import SpecialRequest from "@/components/forms/components/customize/SpecialRequest";
import FormSubmitButton from "@/components/forms/components/FormSubmitButton";
import { CustomizationFormData } from "@/types";
import { useForm } from "react-hook-form";
import DressDesigner from "./DressDesigner";
import useModalById from "@/hooks/useModalById";
import { useTransition } from "react";
import { AddToCartPayload } from "@/types/cart";
import { addToCart } from "@/actions/cart/mutations/addToCart";
import toast from "react-hot-toast";

const CustomDressForm = () => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CustomizationFormData>();

  const { openModal } = useModalById("addToCartModal");

  const handleAddToCart = (data: CustomizationFormData) => {
    const cartItem: AddToCartPayload = {
      customizations: {
        bodiceType: data.bodiceType,
        sleeveType: data.sleeveType,
        skirtType: data.skirtType,
        fabric: data.fabric,
        length: data.length,
        sleeveLength: data.sleeveLength,
        chest: data.chest,
        waist: data.waist,
        request: data.request,
      },

      productType: "customDress",
    };

    startTransition(async () => {
      const error = await addToCart(cartItem);
      if (error) {
        toast.error(error.message, { duration: 5000 });
      } else {
        reset();
        openModal();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddToCart)}
      className="bg-light space-y-6"
    >
      <DressDesigner register={register} watch={watch} errors={errors} />

      <MeasurementInputsSection register={register} errors={errors} />
      <SpecialRequest register={register} />

      <FormSubmitButton label="Add to Cart" isFormSubmitting={isPending} />
    </form>
  );
};

export default CustomDressForm;
