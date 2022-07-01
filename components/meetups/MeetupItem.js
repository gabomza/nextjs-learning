import MeetupCard from "./MeetupCard";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  return (
    <li className={classes.item}>
      <MeetupCard
        meetupData={{
          id: props.id,
          title: props.title,
          image: props.image,
          address: props.address,
        }}
      />
    </li>
  );
}

export default MeetupItem;
