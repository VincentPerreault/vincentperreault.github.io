window.MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]']
    ],
    tags: 'ams'
  },
  chtml: {
    /* Render \text{} in the page font: uniform cap heights (the TeX font's
       "T" looks shorter) and proper accented characters (é in FR labels) */
    mtextInheritFont: true
  }
};
