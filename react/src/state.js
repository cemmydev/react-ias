import create from 'zustand';
import { RENDERING_MODES } from '@hms-dbmi/viv';
import { DeblurMethods } from '@/constants/enums';
import { Options } from '@/constants/filterOptions';
import {
  generateBoxFilter,
  generateGaussianFilter,
  generateLaplacianFilter,
} from '@/helpers/generate-filter';

const captialize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const generateToggles = (defaults, set) => {
  const toggles = {};
  Object.entries(defaults).forEach(([k, v]) => {
    if (typeof v === 'boolean') {
      toggles[`toggle${captialize(k)}`] = () =>
        set((state) => ({
          ...state,
          [k]: !state[k],
        }));
    }
  });
  return toggles;
};

const DEFAUlT_CHANNEL_STATE = {
  channelsVisible: [],
  contrastLimits: [],
  colors: [],
  domains: [],
  channelMap: [],
  tiffNames: [],
  experimentName: '',
  selections: [],
  ids: [],
  loader: [{ labels: [], shape: [] }],
  image: 0,
  brightness: 0,
  contrast: 0,
  gamma: 50,
  deblur: {
    size: 1,
    kernel: [],
  },
  iterNum: 1,
};

const DEFAUlT_CHANNEL_VALUES = {
  contrastLimits: [0, 65535],
  colors: [255, 255, 255],
  domains: [0, 65535],
  selections: { z: 0, c: 0, t: 0 },
  ids: '',
};

export const useChannelsStore = create((set) => ({
  ...DEFAUlT_CHANNEL_STATE,
  ...generateToggles(DEFAUlT_CHANNEL_VALUES, set),
  setChannleVisible: (index) =>
    set((state) => ({
      ...state,
      channelsVisible: state.channelsVisible.map((v, idx) =>
        idx === index ? !v : v,
      ),
    })),
  setChannelsVisible: (visibilities) =>
    set((state) => ({
      ...state,
      channelsVisible: visibilities,
    })),
  setPropertiesForChannel: (channel, newProperties) =>
    set((state) => {
      const entries = Object.entries(newProperties);
      const newState = {};
      entries.forEach(([property, value]) => {
        newState[property] = [...state[property]];
        newState[property][channel] = value;
      });
      return { ...state, ...newState };
    }),
  removeChannel: (channel) =>
    set((state) => {
      const newState = {};
      const channelKeys = Object.keys(DEFAUlT_CHANNEL_VALUES);
      Object.keys(state).forEach((key) => {
        if (channelKeys.includes(key)) {
          newState[key] = state[key].filter((_, j) => j !== channel);
        }
      });
      return { ...state, ...newState };
    }),
  addChannel: (newProperties) =>
    set((state) => {
      const entries = Object.entries(newProperties);
      const newState = { ...state };
      entries.forEach(([property, value]) => {
        newState[property] = [...state[property], value];
      });
      Object.entries(DEFAUlT_CHANNEL_VALUES).forEach(([k, v]) => {
        if (newState[k].length < newState[entries[0][0]].length) {
          newState[k] = [...state[k], v];
        }
      });
      return newState;
    }),
  setBrightness: (newValue) =>
    set((state) => ({ ...state, brightness: newValue })),
  setContrast: (newValue) => set((state) => ({ ...state, contrast: newValue })),
  setGamma: (newValue) => set((state) => ({ ...state, gamma: newValue })),
  setDeConv2D: (method, size, sigma) =>
    set((state) => ({
      ...state,
      deblur: {
        size,
        kernel:
          method === DeblurMethods.gaussian
            ? generateGaussianFilter(sigma, size)
            : method === DeblurMethods.laplacian
            ? generateLaplacianFilter(size)
            : method === DeblurMethods.box
            ? generateBoxFilter(size)
            : [],
      },
    })),

  setFilter2D: (method, size) =>
    set((state) => ({
      ...state,
      deblur: {
        size,
        kernel: Options(size)[method].kernel(size),
      },
    })),
  setPasses: (newValue) => set((state) => ({ ...state, iterNum: newValue })),
}));

const DEFAULT_IMAGE_STATE = {
  lensSelection: 0,
  colormap: '',
  renderingMode: RENDERING_MODES.MAX_INTENSITY_PROJECTION,
  resolution: 0,
  lensEnabled: false,
  zoomLock: true,
  panLock: true,
  isOverviewOn: false,
  useFixedAxis: true,
  xSlice: null,
  ySlice: null,
  zSlice: null,
  onViewportLoad: () => {},
};

export const useImageSettingsStore = create((set) => ({
  ...DEFAULT_IMAGE_STATE,
  ...generateToggles(DEFAULT_IMAGE_STATE, set),
}));

const DEFAULT_VIEWER_STATE = {
  isChannelLoading: [],
  isViewerLoading: true,
  pixelValues: [],
  isOffsetsSnackbarOn: false,
  loaderErrorSnackbar: {
    on: false,
    message: null,
  },
  isNoImageUrlSnackbarOn: false,
  isVolumeRenderingWarningOn: false,
  useLinkedView: false,
  isControllerOn: true,
  use3d: false,
  useLens: false,
  useColormap: false,
  globalSelection: { z: 0, t: 0 },
  channelOptions: [],
  metadata: null,
  viewState: { zoom: 1 },
  source: '',
  pyramidResolution: 0,
};

export const useViewerStore = create((set) => ({
  ...DEFAULT_VIEWER_STATE,
  ...generateToggles(DEFAULT_VIEWER_STATE, set),
  setIsChannelLoading: (index, val) =>
    set((state) => {
      const newIsChannelLoading = [...state.isChannelLoading];
      newIsChannelLoading[index] = val;
      return { ...state, isChannelLoading: newIsChannelLoading };
    }),
  addIsChannelLoading: (val) =>
    set((state) => {
      const newIsChannelLoading = [...state.isChannelLoading, val];
      return { ...state, isChannelLoading: newIsChannelLoading };
    }),
  removeIsChannelLoading: (index) =>
    set((state) => {
      const newIsChannelLoading = [...state.isChannelLoading];
      newIsChannelLoading.splice(index, 1);
      return { ...state, isChannelLoading: newIsChannelLoading };
    }),
  setViewState: (viewState) =>
    set((state) => ({
      ...state,
      viewState: { ...state.viewState, ...viewState },
    })),
}));

export const useLoader = () => {
  const [fullLoader, image] = useChannelsStore((store) => [
    store.loader,
    store.image,
  ]);
  return Array.isArray(fullLoader[0]) ? fullLoader[image] : fullLoader;
};

export const useMetadata = () => {
  const image = useChannelsStore((store) => store.image);
  const metadata = useViewerStore((store) => store.metadata);
  return Array.isArray(metadata) ? metadata[image] : metadata;
};

const DEFAUlT_FLAG_STATE = {
  DialogFilter2dflag: false,
  DialogFilter3dflag: false,
  dialogFlag: false,
  Dialog3dflag: false,
  Focusflag: false,
  Superflag: false,
  OpenCloudflag: false,
  OpenFileflag: false,
  DialogBasicFlag: false,
  DialogCustomFlag: false,
  DialogCustomNameFlag: false,
  DialogCellposeFlag: false,
  DialogVisualFlag: false,
  DialogLoadingFlag: false,
};

export const useFlagsStore = create((set) => ({
  ...DEFAUlT_FLAG_STATE,
  ...generateToggles(DEFAUlT_FLAG_STATE, set),
}));
