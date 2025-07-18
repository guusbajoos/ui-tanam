import api from "../index";

export default {
  submitFormResult( payload) {
    return api.post(`/v1/public/forms`, payload);
  }
};
