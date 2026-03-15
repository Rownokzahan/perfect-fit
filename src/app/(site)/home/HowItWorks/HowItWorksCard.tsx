interface HowItWorksCardProps {
  item: {
    step: number;
    title: string;
    description: string;
  };
}

const HowItWorksCard = ({ item }: HowItWorksCardProps) => {
  const { step, title, description } = item;

  return (
    <article className="p-6 rounded bg-light overflow-hidden group">
      <div className="size-9 sm:size-12 grid place-items-center relative z-0">
        <div className="size-full rounded-full border border-white bg-dark grid place-items-center">
          <span className="text-light text-xl">{step}</span>
        </div>
        <div className="size-4.5 sm:size-11.5 -z-10 rounded-full bg-dark absolute group-hover:size-300 duration-700" />
      </div>

      <div className="mt-3 ps-1 group-hover:text-light duration-300 text-dark relative z-0">
        <h3 className="mb-2">{title}</h3>
        <p className="opacity-60 text-pretty text-sm">{description}</p>
      </div>
    </article>
  );
};

export default HowItWorksCard;

