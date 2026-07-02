import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initClipboard,
  loadMermaid,
  initSpoilers
} from './modules/components';

loadImg();
imgPopup();
initSidebar();
initTopbar();
initClipboard();
loadMermaid();
initSpoilers();
basic();
