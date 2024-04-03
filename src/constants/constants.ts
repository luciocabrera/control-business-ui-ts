export const PIVOT_SETTINGS = [
  { accepts: ['column', 'row', 'value', 'both'], id: 'hiddenColumns' },
  { accepts: ['column', 'both'], id: 'visibleColumns' },
  { accepts: ['both', 'row'], id: 'visibleRows' },
  { accepts: ['value'], id: 'visibleCounters' },
];

export const TABLE = {
  prefetchLimit: 1000,
  queryLimit: 250,
  scrollThreshold: 300,
} as const;

export const CATEGORIES = [
  'Attribute',
  'Attachment',
  'Relation',
  'Comment',
  'Rating',
  'Status',
  'Workflow',
  'Responsibility',
  'User',
  'User Group',
  'Role',
  'Tags',
  'Others',
];

export const CAUSES = [
  'Manual',
  'Import',
  'Bulk Delete',
  'Bulk Move',
  'Bulk Edit',
  'Bulk Insert',
  'Workflow',
];

export const CHANGE_TYPES = ['Add', 'Update', 'Delete'];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const CHART_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#0c3a87',
  '#af0a43',
  '#897c05',
  '#0fad5a',
  '#0fadaa',
  '#0ebf41',
  '#0eaabf',
] as const;

export const INIT_YEAR = 2023;

export const APP_TITLE = 'Collibra Insights';

export const INITIAL_ERROR_STATE = {
  authoringMonths: {
    errorMessage: '',
    hasError: false,
  },
  from: {
    errorMessage: '',
    hasError: false,
  },
  monthAuthoringFrom: {
    errorMessage: '',
    hasError: false,
  },
  monthAuthoringTo: {
    errorMessage: '',
    hasError: false,
  },
  monthFrom: {
    errorMessage: '',
    hasError: false,
  },
  monthTo: {
    errorMessage: '',
    hasError: false,
  },
  to: {
    errorMessage: '',
    hasError: false,
  },
  yearFrom: {
    errorMessage: '',
    hasError: false,
  },
  yearTo: {
    errorMessage: '',
    hasError: false,
  },
};
