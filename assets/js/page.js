import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initClipboard,
  loadMermaid,
  initSpoilers,
  initTextFx,
  initFoldCards,
  initChecklists,
  initQuizzes,
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
initFoldCards();
initChecklists();
initQuizzes();
initGrooveRadarPlayground();
basic();
