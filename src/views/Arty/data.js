export const delays = {
  step1: 20000,
  step2: 2000,
};

export const ProcessingItemsData = [
  { title: 'Processing the Image', delay: delays.step1, isChecked: false },
  { delay: delays.step1 + 15 * delays.step2, title: 'Analyzing Events', isChecked: false },
  { title: 'Predicting Cost', isChecked: false, delay: 18000 },
];

export const visibleValues = [
  'figurative',
  'narrative',
  'genre',
  'style',
  'size',
  'compositional_vectors',
  'action',
  'watch_vector',
];

export const noneVisibleValues = [
  'light',
  'space',
  'movement',
  'impact',
  'size',
  'style',
  'genre',
  'watch_vector',
];

export const eventsData = ['Social Media', 'Gallery', 'Website', 'Auctions', 'Articles'];

export const scoreData = ['2', '0.4', '0', '0', '2'];
