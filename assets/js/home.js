import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime, loadImg, initHomeRadar } from './modules/components';

loadImg();
initLocaleDatetime();
initSidebar();
initTopbar();
initHomeRadar();
basic();
