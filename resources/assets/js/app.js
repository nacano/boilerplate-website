/**
 * Bundle script
 */
import { InViewObserver } from './components/InViewObserver';
import SampleComponent from './components/SampleComponent';

document.addEventListener('DOMContentLoaded', () => {
  SampleComponent();

  const ppp = new InViewObserver(null, {});
  ppp.watch();
  ppp.unwatch((el) => {
    console.log(el);
  });
});
