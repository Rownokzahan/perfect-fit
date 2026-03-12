import { Customizations } from "@/types/cart";

interface ItemCustomizationsProps {
  customizations: Customizations;
}

const ItemCustomizations = ({ customizations }: ItemCustomizationsProps) => {
  if (!customizations) return null;

  const fields = [
    { label: "Bodice", value: customizations.bodiceType },
    { label: "Sleeve", value: customizations.sleeveType },
    { label: "Skirt", value: customizations.skirtType },
    { label: "Fabric", value: customizations.fabric },
    { label: "Length", value: customizations.length, unit: '"' },
    { label: "Sleeve Length", value: customizations.sleeveLength, unit: '"' },
    { label: "Chest", value: customizations.chest, unit: '"' },
    { label: "Waist", value: customizations.waist, unit: '"' },
  ];

  return (
    <div className="mt-3 py-3 border-t bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-3">
        {fields.map(({ label, value, unit }) => (
          <div key={label}>
            <p className="text-xs text-dark-light/80 uppercase tracking-wider">
              {label}
            </p>
            <p className="text-sm text-stone-700 mt-0.5">
              {value}
              {unit}
            </p>
          </div>
        ))}
      </div>

      {customizations.request && (
        <p className="w-max mt-3 bg-white border-s-2 px-2 py-1">
          <span className="text-xs text-dark-light/80 uppercase tracking-wider">
            Request:
          </span>
          <span className="text-sm text-stone-700 mt-0.5 ms-1">
            {customizations.request}
          </span>
        </p>
      )}
    </div>
  );
};

export default ItemCustomizations;
