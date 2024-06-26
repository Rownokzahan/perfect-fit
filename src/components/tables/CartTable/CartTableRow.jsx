import { RiDeleteBinLine } from "react-icons/ri";
import DressAssembler from "../../shared/DressAssembler";
import { BiSolidUpArrow } from "react-icons/bi";

const CartTableRow = ({ item, handleRemoveFromCartModal }) => {
  const {
    image,
    name,
    Bodice,
    Sleeve,
    "Skirt Style": SkirtStyle,
    Chest,
    Waist,
    Height,
    "Arm Length": ArmLength,
    Request,
    price,
  } = item || {};

  return (
    <tr>
      <td className="px-6 py-8">
        <div className="grid grid-cols-2 gap-8">
          {image === "Custom Dress" ? (
            <div className="max-w-52">
              <DressAssembler
                bodice={Bodice}
                sleeve={Sleeve}
                skirt={SkirtStyle}
              />
            </div>
          ) : (
            <img
              src={image}
              className="h-full me-8 object-cover rounded"
              alt=""
            />
          )}
          <div className="space-y-4">
            <h5>{name}</h5>
            <div className="text-sm">
              <h6 className="font-medium">Style</h6>
              <p>Bodice: {Bodice}</p>
              <p>Sleeve: {Sleeve}</p>
              <p>Skirt Style: {SkirtStyle}</p>
            </div>
            <div className="text-sm">
              <h6 className="font-medium">Measurements</h6>
              <p>Chest: {Chest}</p>
              <p>Waist: {Waist}</p>
              <p>Height: {Height}</p>
              <p>Arm Length : {ArmLength}</p>
            </div>

            {Request && (
              <div className="text-sm">
                <h6 className="font-medium">Request/Info</h6>
                {Request.length > 28 ? (
                  <div className="relative group">
                    <p className="whitespace-nowrap">
                      {Request.slice(0, 28)}...
                    </p>
                    <div className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-100 absolute p-6 left-0 top-10 w-96 bg-primary-white">
                      <p className="relative">
                        {Request}
                        <BiSolidUpArrow className="text-primary-white text-4xl absolute -top-12 left-0" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>{Request}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-8">
        <h4 className="font-medium">${price}</h4>
      </td>
      <td className="px-6 py-8">
        <p className="py-1 px-3 border w-max">1</p>
      </td>
      <td className="px-6 py-8">
        <button
          className="text-xl text-red-600"
          onClick={() => handleRemoveFromCartModal(item)}
        >
          <RiDeleteBinLine />
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
