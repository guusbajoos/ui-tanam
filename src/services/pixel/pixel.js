import api from '../index';

const trackEvent = (payload, { eventMeta = false, eventTiktok = false } = {}) => {
    const modeDebug = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
    return api.post(
        `/v1/public/trackings?event_meta=${eventMeta}&event_tiktok=${eventTiktok}&mode_debug=${modeDebug}`,
        { request: payload }
    );
};

const pixelEvent = (payload) => trackEvent(payload, { eventMeta: true, eventTiktok: true });
const tiktokNonPixelEvent = (payload) => trackEvent(payload, { eventMeta: false, eventTiktok: true });
const metaEvent = (payload) => trackEvent(payload, { eventMeta: true, eventTiktok: false });
const tiktokEvent = (payload) => trackEvent(payload, { eventMeta: false, eventTiktok: false });

const trackTiktokBrowserEvent = (eventName, params = {}) => {
    if (window.ttq) {
      window.ttq.track(eventName, params);
    }
  };


export default { pixelEvent, tiktokNonPixelEvent, metaEvent, tiktokEvent, trackTiktokBrowserEvent };
