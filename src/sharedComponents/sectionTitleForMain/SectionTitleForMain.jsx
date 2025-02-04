const SectionTitleForMain = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center w-10/12 md:w-4/12 my-8">
      <h3 className="md:text-3xl text-xl text-black uppercase font-semibold md:border-y-4 border-y-2 py-2">
        {heading}
      </h3>
      <p className="text-yellow-600 mb-2 pt-2">--- {subHeading} ---</p>
    </div>
  );
};

export default SectionTitleForMain;
