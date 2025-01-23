const SectionTitleForMain = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      <h3 className="text-3xl text-black uppercase font-semibold border-y-4 py-2">
        {heading}
      </h3>
      <p className="text-yellow-600 mb-2 pt-2">--- {subHeading} ---</p>
    </div>
  );
};

export default SectionTitleForMain;
