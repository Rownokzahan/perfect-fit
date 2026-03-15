import { IconType } from "react-icons";

interface WhyUsCardProps {
  item: {
    title: string;
    description: string;
    Icon: IconType;
  };
}

const WhyUsCard = ({ item }: WhyUsCardProps) => {
  const { title, description, Icon } = item;

  return (
    <div className="py-8 px-4 border border-secondary text-center text-secondary">
      <div className="shrink-0 mx-auto w-fit">
        <Icon className="text-3xl xl:text-4xl" />
      </div>

      <h3 className="mt-2 text-sm xl:text-base">{title}</h3>

      <p className="hidden xl:block mt-2 text-sm text-light/50">
        {description}
      </p>
    </div>
  );
};

export default WhyUsCard;

