import CustomizeStyleSection from "@/components/forms/components/customize/CustomizeStyleSection";
import CustomDressPreview from "@/components/ui/CustomDressPreview";
import { CustomizationFormData } from "@/types";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface DressDesignerProps {
  register: UseFormRegister<CustomizationFormData>;
  watch: UseFormWatch<CustomizationFormData>;
  errors?: FieldErrors<CustomizationFormData>;
}

const DressDesigner = ({ register, watch, errors }: DressDesignerProps) => {
  const [bodice, sleeve, skirt] = watch(["bodiceType", "sleeveType", "skirtType"]);

  return (
    <div className="grid gap-8 sm:grid-cols-[1fr_43%] lg:grid-cols-[1fr_50%] xl:grid-cols-[1fr_43%] overflow-hidden">
      <div className="sm:order-2 sm:-mx-16 lg:-mx-8">
        <CustomDressPreview bodice={bodice} sleeve={sleeve} skirt={skirt} />

        <h3 className="text-xl text-center font-medium">$50</h3>
      </div>

      <CustomizeStyleSection
        register={register}
        errors={errors}
        includeDefaultOptions={false}
      />
    </div>
  );
};

export default DressDesigner;
