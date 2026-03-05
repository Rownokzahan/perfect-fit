"use client";

import { createOrder } from "@/actions/orders/mutations/createOrder";
import EmailField from "@/components/forms/components/EmailField";
import InputField from "@/components/forms/components/InputField";
import useModalById from "@/hooks/useModalById";
import { floatingInputClass } from "@/styles/formStyles";
import { DeliveryInfo } from "@/types/order";
import clsx from "clsx";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiLoader4Fill } from "react-icons/ri";

export interface DeliveryInfoFormData {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
}

interface DeliveryInfoFormProps {
  userName: string;
  userEmail: string;
}

const DeliveryInfoForm = ({ userName, userEmail }: DeliveryInfoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeliveryInfoFormData>({
    defaultValues: {
      name: userName,
      email: userEmail,
    },
  });

  const [isPending, startTransition] = useTransition();
  const { openModal: openOrderSuccessModal } =
    useModalById("orderSuccessModal");

  const handlePlaceOrder = (data: DeliveryInfoFormData) => {
    if (isPending) {
      return;
    }

    const deliveryInfo: DeliveryInfo = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      deliveryAddress: data.deliveryAddress,
    };

    startTransition(async () => {
      const error = await createOrder({ deliveryInfo });

      if (error) {
        toast.error(error.message, { duration: 5000 });
        return;
      }

      reset();
      openOrderSuccessModal();
    });
  };

  return (
    <>
      {/* Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs grid place-content-center">
          <div className="w-xs py-6 px-4 sm:p-8 rounded bg-light">
            <RiLoader4Fill className="mb-4 text-5xl mx-auto text-primary animate-spin" />

            <h3 className="text-center text-xl font-medium">
              Placing your order...
            </h3>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6 rounded bg-light-light space-y-4">
        <h3 className="font-semibold sm:text-lg">Delivery Info</h3>

        <form
          id="place-order-form"
          onSubmit={handleSubmit(handlePlaceOrder)}
          className="space-y-5 bg-inherit"
        >
          <InputField
            id="name"
            label="Full Name"
            type="text"
            registerProps={register("name", {
              required: "Full Name is required",
            })}
            error={errors?.name}
          />

          <EmailField register={register} error={errors?.email} />

          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            registerProps={register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^\+?[\d\s\-().]{10,}$/,
                message: "Please enter a valid phone number",
              },
            })}
            error={errors?.phoneNumber}
          />

          <InputField
            id="deliveryAddress"
            label="Delivery Address"
            type="text"
            registerProps={register("deliveryAddress", {
              required: "Delivery Address is required",
            })}
            error={errors?.deliveryAddress}
          />

          <div
            className={clsx(
              floatingInputClass,
              "text-dark-light flex justify-between items-center",
            )}
          >
            Cash on Delivery
            <BsCheckCircleFill className="text-dark/80" />
          </div>
        </form>
      </div>
    </>
  );
};

export default DeliveryInfoForm;
