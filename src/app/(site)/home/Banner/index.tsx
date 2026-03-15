import Image from "next/image";
import BannerImage from "../../../../../public/images/home/banner/banner.jpg";

const Banner = () => {
  return (
    <section className="h-dvh -mt-16 lg:-mt-18 relative bg-black/75">
      <Image
        src={BannerImage}
        alt="Banner Image"
        placeholder="blur"
        fill
        quality={100}
        className="size-full object-cover mix-blend-overlay"
      />

      <div className="absolute bottom-[11%] md:bottom-[7%] px-[4%] lg:px-[6%] text-light text-left">
        <h2 className="text-4xl md:text-6xl">
          Clothes that get you.
        </h2>
        <p className="mt-5 text-lg">Every inch made to match</p>
      </div>
    </section>
  );
};

export default Banner;
