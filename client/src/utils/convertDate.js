const convertDate = (isoDate, isOptionsincluded = true) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Date(isoDate).toLocaleDateString(
    "en-US",
    isOptionsincluded && options
  );

  return formattedDate;
};

export default convertDate;
