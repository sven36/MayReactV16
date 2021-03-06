/** @license React vundefined
 * react-server-flight.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (process.env.NODE_ENV !== "production") {
  module.exports = function $$$reconciler($$$hostConfig) {
'use strict';

// This is a host config that's used for the `react-server` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-server` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-server` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* renderer code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.
// eslint-disable-line no-undef
var scheduleWork = $$$hostConfig.scheduleWork;
var beginWriting = $$$hostConfig.beginWriting;
var writeChunk = $$$hostConfig.writeChunk;
var completeWriting = $$$hostConfig.completeWriting;
var flushBuffered = $$$hostConfig.flushBuffered;
var close = $$$hostConfig.close;
var convertStringToBuffer = $$$hostConfig.convertStringToBuffer;

// This is a host config that's used for the `react-server` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-server` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-server` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* renderer code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.
// eslint-disable-line no-undef
var formatChunkAsString = $$$hostConfig.formatChunkAsString;
var formatChunk = $$$hostConfig.formatChunk;
var renderHostChildrenToString = $$$hostConfig.renderHostChildrenToString;

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;





 // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

/*

FLIGHT PROTOCOL GRAMMAR

Response
- JSONData RowSequence
- JSONData

RowSequence
- Row RowSequence
- Row

Row
- "J" RowID JSONData
- "H" RowID HTMLData
- "B" RowID BlobData
- "U" RowID URLData
- "E" RowID ErrorData

RowID
- HexDigits ":"

HexDigits
- HexDigit HexDigits
- HexDigit

HexDigit
- 0-F

URLData
- (UTF8 encoded URL) "\n"

ErrorData
- (UTF8 encoded JSON: {message: "...", stack: "..."}) "\n"

JSONData
- (UTF8 encoded JSON) "\n"
  - String values that begin with $ are escaped with a "$" prefix.
  - References to other rows are encoding as JSONReference strings.

JSONReference
- "$" HexDigits

HTMLData
- ByteSize (UTF8 encoded HTML)

BlobData
- ByteSize (Binary Data)

ByteSize
- (unsigned 32-bit integer)
*/
// TODO: Implement HTMLData, BlobData and URLData.

var stringify = JSON.stringify;
function createRequest(model, destination) {
  var pingedSegments = [];
  var request = {
    destination: destination,
    nextChunkId: 0,
    pendingChunks: 0,
    pingedSegments: pingedSegments,
    completedJSONChunks: [],
    completedErrorChunks: [],
    flowing: false,
    toJSON: function (key, value) {
      return resolveModelToJSON(request, value);
    }
  };
  request.pendingChunks++;
  var rootSegment = createSegment(request, model);
  pingedSegments.push(rootSegment);
  return request;
}

function attemptResolveModelComponent(element) {
  var type = element.type;
  var props = element.props;

  if (typeof type === 'function') {
    // This is a nested view model.
    return type(props);
  } else if (typeof type === 'string') {
    // This is a host element. E.g. HTML.
    return renderHostChildrenToString(element);
  } else {
    throw new Error('Unsupported type.');
  }
}

function pingSegment(request, segment) {
  var pingedSegments = request.pingedSegments;
  pingedSegments.push(segment);

  if (pingedSegments.length === 1) {
    scheduleWork(function () {
      return performWork(request);
    });
  }
}

function createSegment(request, model) {
  var id = request.nextChunkId++;
  var segment = {
    id: id,
    model: model,
    ping: function () {
      return pingSegment(request, segment);
    }
  };
  return segment;
}

function serializeIDRef(id) {
  return '$' + id.toString(16);
}

function serializeRowHeader(tag, id) {
  return tag + id.toString(16) + ':';
}

function escapeStringValue(value) {
  if (value[0] === '$') {
    // We need to escape $ prefixed strings since we use that to encode
    // references to IDs.
    return '$' + value;
  } else {
    return value;
  }
}

function resolveModelToJSON(request, value) {
  if (typeof value === 'string') {
    return escapeStringValue(value);
  }

  while (typeof value === 'object' && value !== null && value.$$typeof === REACT_ELEMENT_TYPE) {
    var element = value;

    try {
      value = attemptResolveModelComponent(element);
    } catch (x) {
      if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
        // Something suspended, we'll need to create a new segment and resolve it later.
        request.pendingChunks++;
        var newSegment = createSegment(request, element);
        var ping = newSegment.ping;
        x.then(ping, ping);
        return serializeIDRef(newSegment.id);
      } else {
        request.pendingChunks++;
        var errorId = request.nextChunkId++;
        emitErrorChunk(request, errorId, x);
        return serializeIDRef(errorId);
      }
    }
  }

  return value;
}

function emitErrorChunk(request, id, error) {
  // TODO: We should not leak error messages to the client in prod.
  // Give this an error code instead and log on the server.
  // We can serialize the error in DEV as a convenience.
  var message;
  var stack = '';

  try {
    if (error instanceof Error) {
      message = '' + error.message;
      stack = '' + error.stack;
    } else {
      message = 'Error: ' + error;
    }
  } catch (x) {
    message = 'An error occurred but serializing the error message failed.';
  }

  var errorInfo = {
    message: message,
    stack: stack
  };
  var row = serializeRowHeader('E', id) + stringify(errorInfo) + '\n';
  request.completedErrorChunks.push(convertStringToBuffer(row));
}

function retrySegment(request, segment) {
  var value = segment.model;

  try {
    while (typeof value === 'object' && value !== null && value.$$typeof === REACT_ELEMENT_TYPE) {
      // If this is a nested model, there's no need to create another chunk,
      // we can reuse the existing one and try again.
      var element = value;
      segment.model = element;
      value = attemptResolveModelComponent(element);
    }

    var json = stringify(value, request.toJSON);
    var row;
    var id = segment.id;

    if (id === 0) {
      row = json + '\n';
    } else {
      row = serializeRowHeader('J', id) + json + '\n';
    }

    request.completedJSONChunks.push(convertStringToBuffer(row));
  } catch (x) {
    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
      // Something suspended again, let's pick it back up later.
      var ping = segment.ping;
      x.then(ping, ping);
      return;
    } else {
      // This errored, we need to serialize this error to the
      emitErrorChunk(request, segment.id, x);
    }
  }
}

function performWork(request) {
  var pingedSegments = request.pingedSegments;
  request.pingedSegments = [];

  for (var i = 0; i < pingedSegments.length; i++) {
    var segment = pingedSegments[i];
    retrySegment(request, segment);
  }

  if (request.flowing) {
    flushCompletedChunks(request);
  }
}

var reentrant = false;

function flushCompletedChunks(request) {
  if (reentrant) {
    return;
  }

  reentrant = true;
  var destination = request.destination;
  beginWriting(destination);

  try {
    var jsonChunks = request.completedJSONChunks;
    var i = 0;

    for (; i < jsonChunks.length; i++) {
      request.pendingChunks--;
      var chunk = jsonChunks[i];

      if (!writeChunk(destination, chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    jsonChunks.splice(0, i);
    var errorChunks = request.completedErrorChunks;
    i = 0;

    for (; i < errorChunks.length; i++) {
      request.pendingChunks--;
      var _chunk = errorChunks[i];

      if (!writeChunk(destination, _chunk)) {
        request.flowing = false;
        i++;
        break;
      }
    }

    errorChunks.splice(0, i);
  } finally {
    reentrant = false;
    completeWriting(destination);
  }

  flushBuffered(destination);

  if (request.pendingChunks === 0) {
    // We're done.
    close(destination);
  }
}

function startWork(request) {
  request.flowing = true;
  scheduleWork(function () {
    return performWork(request);
  });
}
function startFlowing(request) {
  request.flowing = true;
  flushCompletedChunks(request);
}

var ReactFlightServer = Object.freeze({
	createRequest: createRequest,
	startWork: startWork,
	startFlowing: startFlowing
});

// This entry point is intentionally not typed. It exists only for third-party
// renderers. The renderers we ship (such as React DOM) instead import a named
// "inline" entry point (for example, `react-server/flight.inline.dom`). It uses
// the same code, but the Flow configuration redirects the host config to its
// real implementation so we can check it against exact intended host types.
//
// Only one renderer (the one you passed to `yarn flow <renderer>`) is fully
// type-checked at any given time. The Flow config maps the
// `react-server/flight.inline.<renderer>` import (which is *not* Flow typed) to
// `react-server/flight.inline-typed` (which *is*) for the current renderer.
// On CI, we run Flow checks for each renderer separately.


 // TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.


var flight = ReactFlightServer.default || ReactFlightServer;

module.exports = flight;
    var $$$renderer = module.exports;
    module.exports = $$$reconciler;
    return $$$renderer;
  };
}
