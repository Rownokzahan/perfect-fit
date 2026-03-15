import { Customizations } from "@/types/cart";

interface CustomizedProductInfoProps {
  customizations: Customizations;
  name: string;
}

const CustomizedProductInfo = ({
  customizations,
  name,
}: CustomizedProductInfoProps) => {
  const {
    bodiceType,
    sleeveType,
    skirtType,
    fabric,
    length,
    sleeveLength,
    chest,
    waist,
    request,
  } = customizations;

  return (
    <div className="min-w-0 space-y-2">
      <h3 className="truncate">{name}</h3>

      <div className="ps-1 space-y-1 text-xs text-dark-light">
        <p>Bodice: {bodiceType}</p>
        <p>Sleeve: {sleeveType}</p>
        <p>Skirt: {skirtType}</p>
        <p>Fabric: {fabric}</p>
      </div>

      <div className="ps-1 space-y-1 text-xs text-dark-light">
        <p>Length: {length}&quot;</p>
        <p>Sleeve Length: {sleeveLength}&quot;</p>
        <p>Chest: {chest}&quot;</p>
        <p>Waist: {waist}&quot;</p>
      </div>

      {request && (
        <div className="space-y-0.5">
          <h3 className="text-xs">Request/Info</h3>
          <div className="ps-1 text-xs text-dark-light">
            <p>{request}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizedProductInfo;

