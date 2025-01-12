/* eslint-disable react/prop-types */
import { Rating } from '../Rating/Rating';
import { UserReview} from '../../types/types';
import {dateToMonthWordYear, dateToYearMonthDay} from '../../date.ts';
export const Review: React.FC<UserReview> = ({
  comment,
  date,
  rating,
  user
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={user.avatar}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{user.name}</span>
    </div>
    <div className="reviews__info">
      <Rating
        rating={rating}
        containerMix="reviews__rating"
        starsMix="reviews__stars"
        mode="compact"
      />
      <p className="reviews__text">{comment}</p>
      <time className="reviews__time" dateTime={dateToYearMonthDay(new Date(date))}>
        {dateToMonthWordYear(new Date(date))}
      </time>
    </div>
  </li>
);
