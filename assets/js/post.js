import { basic, initTopbar, initSidebar } from './modules/layouts';

import {
  loadImg,
  imgPopup,
  initLocaleDatetime,
  initClipboard,
  initToc,
  loadMermaid,
  initSpoilers,
  initTextFx,
  initChecklists,
  initGrooveRadar
} from './modules/components';

loadImg();
initToc();
imgPopup();
initSidebar();
initLocaleDatetime();
initClipboard();
initTopbar();
loadMermaid();
initSpoilers();
initTextFx();
initChecklists();
initGrooveRadar();
basic();
