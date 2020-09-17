/**
 * Bundle script
 */
import { InViewObserver } from './components/InViewObserver';
import SampleComponent from './components/SampleComponent';

document.addEventListener('DOMContentLoaded', () => {
  SampleComponent();

  const ppp = new InViewObserver('.inview');
  ppp.watch();
  // ppp.unwatch((el) => {
  //   console.log(el);
  // });
});
