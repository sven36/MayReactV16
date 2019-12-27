/** @license React vundefined
 * react-noop-renderer-flight-client.development.js
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

var ReactFlightClient = require('react-flight');

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */
var _ReactFlightClient = ReactFlightClient({
  supportsBinaryStreams: false
});
var createResponse = _ReactFlightClient.createResponse;
var getModelRoot = _ReactFlightClient.getModelRoot;
var processStringChunk = _ReactFlightClient.processStringChunk;
var complete = _ReactFlightClient.complete;

function read(source) {
  var response = createResponse(source);

  for (var i = 0; i < source.length; i++) {
    processStringChunk(response, source[i], 0);
  }

  complete(response);
  return getModelRoot(response);
}

var ReactNoopFlightClient = {
  read: read
};

var ReactNoopFlightClient$1 = Object.freeze({
	default: ReactNoopFlightClient
});

var ReactNoopFlightClient$2 = ( ReactNoopFlightClient$1 && ReactNoopFlightClient ) || ReactNoopFlightClient$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.


var flightClient = ReactNoopFlightClient$2.default || ReactNoopFlightClient$2;

module.exports = flightClient;
  })();
}
