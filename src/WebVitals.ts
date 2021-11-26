/**
 * The web-vitals library is a tiny (~1K), modular library for measuring a
 * ll the Web Vitals metrics on real users
 * @see https://github.com/GoogleChrome/web-vitals
 */
import {useEffect} from 'react';
import {getCLS, getFID, getLCP, getTTFB} from 'web-vitals';

type Props = {
  showStatusInConsoleLog: boolean;
};

/**
 * Status definitions:
 * Status metrics are evaluated against the following boundaries:
 *
 *              | @Good   |	@NeedsImprovement |	@Poor
 *        --------------------------------------------
 *        @LCP	| <=2.5s	| <=4s	            | >4s
 *        ---------------------------------------------
 *        @FID	| <=100ms	| <=300ms	          | >300ms
 *        ---------------------------------------------
 *        @CLS	| <=0.1	  | <=0.25	          | >0.25
 *
 *
 * @LCP (largest contentful paint): The amount of time to render
 * the largest content element visible in the viewport,
 * from when the user requests the URL. The largest element is
 * typically an image or video, or perhaps a large block-level
 * text element. This is important because it tells the reader
 *        @that the URL is actually loading. Agg LCP (aggregated LCP)
 *        shown in the report is the time
 *        it takes for 75% of the visits to a URL in the group
 *        to reach the LCP state.
 *
 * @FID (first input delay): The time from when a user first interacts
 * with your page (when they clicked a link, tapped on a button, and so on)
 * to the time when the browser responds to that interaction.
 * This measurement is taken from whatever interactive element
 * that the user first clicks. This is important on pages where the user needs
 * to do something, because this is when the page has become interactive.
 *        @AggFID (aggregated FID) shown in the report means
 *        that 75% of visits to a URL in this group had this value or better.
 *
 * @CLS (Cumulative Layout Shift): CLS measures the sum total of all individual
 * layout shift scores for every unexpected layout shift that occurs during
 * the entire lifespan of the page. The score is zero to any positive number,
 * where zero means no shifting and the larger the number, the more
 * layout shift on the page. This is important because having pages
 * elements shift while a user is trying to interact with it is a bad user experience.
 * If you can't seem to find the reason for a high value,
 * try interacting with the page to see how that affects the score.
 *        @AggCLS (aggregated CLS) shown in the report
 *        is the lowest common CLS for 75% of visits to a URL in the group.
 *
 */
const WebVitals = ({showStatusInConsoleLog}: Props) => {
  useEffect(() => {
    if (showStatusInConsoleLog) {
      getTTFB(console.log);
      getCLS(console.log);
      getFID(console.log);
      getLCP(console.log);
    }
  }, [showStatusInConsoleLog]);

  return null;
};

export default WebVitals;
