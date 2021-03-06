/** @license React vundefined
 * react-noop-renderer-flight-server.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var ReactFlightServer = require('react-server/flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
var ReactNoopFlightServer = ReactFlightServer({
  scheduleWork: function (callback) {
    callback();
  },
  beginWriting: function (destination) {},
  writeChunk: function (destination, buffer) {
    destination.push(Buffer.from(buffer).toString('utf8'));
  },
  completeWriting: function (destination) {},
  close: function (destination) {},
  flushBuffered: function (destination) {},
  convertStringToBuffer: function (content) {
    return Buffer.from(content, 'utf8');
  },
  formatChunkAsString: function (type, props) {
    return JSON.stringify({
      type: type,
      props: props
    });
  },
  formatChunk: function (type, props) {
    return Buffer.from(JSON.stringify({
      type: type,
      props: props
    }), 'utf8');
  },
  renderHostChildrenToString: function (children) {
    throw new Error('The noop rendered do not support host components');
  }
});

function render(model) {
  var destination = [];
  var request = ReactNoopFlightServer.createRequest(model, destination);
  ReactNoopFlightServer.startWork(request);
  return destination;
}

var ReactNoopFlightServer$1 = {
  render: render
};

var ReactNoopFlightServer$2 = Object.freeze({
	default: ReactNoopFlightServer$1
});

var ReactNoopFlightServer$3 = ( ReactNoopFlightServer$2 && ReactNoopFlightServer$1 ) || ReactNoopFlightServer$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.


var flightServer = ReactNoopFlightServer$3.default || ReactNoopFlightServer$3;

module.exports = flightServer;
  })();
}
