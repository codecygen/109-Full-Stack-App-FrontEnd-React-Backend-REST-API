const convertDate = (isoDate) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = new Date(isoDate).toLocaleDateString(
    "en-US",
    options
  );

  return formattedDate;
};

export default convertDate;