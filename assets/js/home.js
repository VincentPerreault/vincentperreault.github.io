import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime, loadImg, initHomeRadar, initHomeSort } from './modules/components';

loadImg();
initLocaleDatetime();
initSidebar();
initTopbar();
initHomeRadar();
initHomeSort();
basic();
