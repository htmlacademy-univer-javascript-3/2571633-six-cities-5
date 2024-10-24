import classNames from 'classnames';
import { Review } from './Review';
type ReviewObject = {
  date: Date;
  text: string;
  rating: number;
  userName: string;
  userAvatarSrc: string;
};
type ReviewListProps = {
  reviews: ReviewObject[];
  containerMix?: string;
};

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  containerMix,
}) => (
  <section className={classNames('reviews', containerMix)}>
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.date.toString()} {...review} />
      ))}
    </ul>
  </section>
);
