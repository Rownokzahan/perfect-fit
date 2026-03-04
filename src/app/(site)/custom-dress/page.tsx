import CustomDressForm from "./CustomDressForm";

export const metadata = {
  title: "Custom Dress",
};

const CustomDressPage = () => {
  return (
    <div className="max-w-5xl ui-container mt-8 mb-12">
      <div className="mb-8 space-y-2">
        <h3 className="font-semibold text-2xl text-center">
          Design Your Own Dress
        </h3>
        <p className="text-center text-sm text-dark-light">
          Select (click on small images) from the options below to design your
          own dress
        </p>
      </div>

      <CustomDressForm />
    </div>
  );
};

export default CustomDressPage;
