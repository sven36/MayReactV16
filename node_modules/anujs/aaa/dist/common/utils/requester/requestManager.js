import React from "../../../ReactWX.js";
const RequestManager = {
  request: function (reqObj) {
    React.api.request(reqObj);
  }
};
export default RequestManager;