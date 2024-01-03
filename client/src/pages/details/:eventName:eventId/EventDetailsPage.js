import { useParams } from "react-router-dom";

const EventIdPage = () => {
  const params = useParams();

  return (
    <div>
      <p>{params.eventName}</p>
      <p>{params.eventId}</p>
    </div>
  );
};

export default EventIdPage;
