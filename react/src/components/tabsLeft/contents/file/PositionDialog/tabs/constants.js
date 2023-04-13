export const PositionTabs = {
  images: 'images',
  tiling: 'tiling',
  metadata: 'metadata',
  naming: 'naming',
  groups: 'groups',
};

export const PositionTabLabels = {
  [PositionTabs.images]: 'Images',
  [PositionTabs.tiling]: 'Tiling',
  [PositionTabs.metadata]: 'Metadata',
  [PositionTabs.naming]: 'Naming & Files',
  [PositionTabs.groups]: 'Groups',
};

export const TilingTabs = {
  alignment: 'aligment',
};

export const TilingTabLabels = {
  [TilingTabs.alignment]: 'Alignment',
};

export const Alignments = {
  raster: 'raster',
  snake: 'snake',
};

export const AlignmentLabels = {
  [Alignments.raster]: 'Raster',
  [Alignments.snake]: 'Snake',
};

export const Directions = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export const DirectionLabels = {
  [Directions.horizontal]: 'Horizontal',
  [Directions.vertical]: 'Vertical',
};

export const METADATA_COLUMNS = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 5,
  },
  {
    field: 'DimensionOrder',
    headerName: 'DimensionOrder',
    width: 100,
  },
  {
    field: 'SizeX',
    headerName: 'SizeX',
    width: 80,
  },
  {
    field: 'SizeY',
    headerName: 'SizeY',
    width: 80,
  },
  {
    field: 'SizeZ',
    headerName: 'SizeZ',
    width: 80,
  },
  {
    field: 'SizeC',
    headerName: 'SizeC',
    width: 80,
  },
  {
    field: 'SizeT',
    headerName: 'SizeT',
    width: 80,
  },
  {
    field: 'Type',
    headerName: 'Type',
    width: 80,
  },
];

export const DEFAULT_NAME_PATTERNS = [
  {
    label: 'Series',
    text: '',
    start: 0,
    end: 0,
    color: '#4caf50',
    field: 'series',
  },
  {
    label: 'Row',
    text: '',
    start: 0,
    end: 0,
    color: '#1976d2',
    field: 'row',
  },
  {
    label: 'Column',
    text: '',
    start: 0,
    end: 0,
    color: '#ff5722',
    field: 'col',
  },
  {
    label: 'Field',
    text: '',
    start: 0,
    end: 0,
    color: '#fb8c00',
    field: 'field',
  },
  {
    label: 'Channel',
    text: '',
    start: 0,
    end: 0,
    color: '#9c27b0',
    field: 'channel',
  },
  {
    label: 'Z-Index',
    text: '',
    start: 0,
    end: 0,
    color: '#607d8b',
    field: 'z',
  },
  {
    label: 'Time',
    text: '',
    start: 0,
    end: 0,
    color: '#ff5252',
    field: 'time',
  },
];

export const NAME_PATTERN_ORDER = [
  'id',
  'filename',
  'series',
  'time',
  'z',
  'row',
  'col',
  'field',
  'channel',
];

export const NAME_TABLE_COLUMNS = [
  { headerName: 'No', field: 'id', width: 40 },
  { headerName: 'File Name', field: 'filename', width: 300 },
  { headerName: 'Series', field: 'series', width: 60 },
  { headerName: 'Row', field: 'row', width: 60 },
  { headerName: 'Col', field: 'col', width: 60 },
  { headerName: 'Field', field: 'field', width: 60 },
  { headerName: 'C', field: 'channel', width: 60 },
  { headerName: 'Z', field: 'z', width: 60 },
  { headerName: 'T', field: 'time', width: 60 },
];
