import Card from "../ui/Card";
import { useRouter } from "next/router";
import classes from "./MeetupItem.module.css";

const MeetupCard = (props) => {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push(`/meetups/${props.meetupData.id}`);
  };
  return (
    <Card>
      <div className={classes.image}>
        <img src={props.meetupData.image} alt={props.meetupData.title} />
      </div>
      <div className={classes.content}>
        <h3>{props.meetupData.title}</h3>
        <address>{props.meetupData.address}</address>
      </div>
      <div className={classes.actions}>
        <button onClick={showDetailsHandler}>Show Details</button>
      </div>
    </Card>
  );
};

export default MeetupCard;
