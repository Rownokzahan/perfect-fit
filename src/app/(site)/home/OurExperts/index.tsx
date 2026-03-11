import OurExpertsCarousel from "./OurExpertsCarousel";

const OurExperts = () => {
  return (
    <section className="ui-container my-16">
      <h3 className="mb-10 text-2xl sm:text-3xl font-semibold font-playfair text-center">
        Our <span className="text-primary">Experts</span>
      </h3>

      <OurExpertsCarousel />
    </section>
  );
};

export default OurExperts;
