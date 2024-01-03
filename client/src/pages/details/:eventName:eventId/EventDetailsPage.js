import { useParams } from "react-router-dom";

const EventIdPage = () => {
  const params = useParams();

  return (
    <div>
      <p>{params.name}</p>
      <p>{params.id}</p>
    </div>
  );
};

export default EventIdPage;
