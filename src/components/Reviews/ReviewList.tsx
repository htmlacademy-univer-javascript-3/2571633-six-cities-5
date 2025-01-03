/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { Review } from './Review';
import { UserReview} from '../../types/types';
type ReviewListProps = {
  reviews: UserReview[];
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
        <Review key={review.id} {...review} />
      ))}
    </ul>
  </section>
);
