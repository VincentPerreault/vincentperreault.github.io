import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initClipboard,
  loadMermaid,
  initSpoilers,
  initTextFx,
  initChecklists,
  initGrooveRadarPlayground
} from './modules/components';

loadImg();
imgPopup();
initSidebar();
initTopbar();
initClipboard();
loadMermaid();
initSpoilers();
initTextFx();
initChecklists();
initGrooveRadarPlayground();
basic();
