"use client";

import { useTransition } from "react";
import CustomizeStyleSection from "@/components/forms/components/customize/CustomizeStyleSection";
import MeasurementInputsSection from "@/components/forms/components/customize/MeasurementInputsSection";
import SpecialRequest from "@/components/forms/components/customize/SpecialRequest";
import FormSubmitButton from "@/components/forms/components/FormSubmitButton";
import useModalById from "@/hooks/useModalById";
import { CustomizationFormData } from "@/types";
import { Product } from "@/types/product";
import { useForm } from "react-hook-form";
import {
  addToCart,
  AddToCartPayload,
} from "@/actions/cart/mutations/addToCart";
import toast from "react-hot-toast";

interface DressCustomizationProps {
  dress: Product;
}

const DressCustomization = ({ dress }: DressCustomizationProps) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
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
      },
      measurements: {
        length: data.length,
        sleeveLength: data.sleeveLength,
        chest: data.chest,
        waist: data.waist,
      },
      isCustomDress: false,
      product: {
        _id: dress._id,
        nameSnapshot: dress.name,
        priceSnapshot: dress.price,
        imageSnapshot: dress.image,
      },

      quantity: 1,
      totalPrice: dress.price,
      request: data.request,
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
    <div className="space-y-4">
      <h3 className="pb-2 border-b text-xl font-medium text-dark-light">
        Change Dress Style
      </h3>

      <form
        onSubmit={handleSubmit(handleAddToCart)}
        className="bg-light space-y-6"
      >
        <CustomizeStyleSection
          register={register}
          errors={errors}
          includeDefaultOptions={true}
        />
        <MeasurementInputsSection register={register} errors={errors} />
        <SpecialRequest register={register} error={errors?.request} />

        <FormSubmitButton label="Add to Cart" isFormSubmitting={isPending} />
      </form>
    </div>
  );
};

export default DressCustomization;
