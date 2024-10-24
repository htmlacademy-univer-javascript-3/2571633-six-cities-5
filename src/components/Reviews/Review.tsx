/* eslint-disable react/prop-types */
import { Rating } from '../Rating/Rating';
type ReviewObject = {
  date: Date;
  text: string;
  rating: number;
  userName: string;
  userAvatarSrc: string;
};
export const dateToYearMonthDay = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

export const dateToMonthWordYear = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long' }).format(
    date,
  );
export const Review: React.FC<ReviewObject> = ({
  text,
  date,
  rating,
  userName,
  userAvatarSrc,
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={userAvatarSrc}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{userName}</span>
    </div>
    <div className="reviews__info">
      <Rating
        rating={rating}
        containerMix="reviews__rating"
        starsMix="reviews__stars"
        mode="compact"
      />
      <p className="reviews__text">{text}</p>
      <time className="reviews__time" dateTime={dateToYearMonthDay(date)}>
        {dateToMonthWordYear(date)}
      </time>
    </div>
  </li>
);
