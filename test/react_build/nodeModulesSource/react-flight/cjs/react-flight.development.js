/** @license React vundefined
 * react-flight.development.js
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
// eslint-disable-line no-undef
var supportsBinaryStreams = $$$hostConfig.supportsBinaryStreams;
var createStringDecoder = $$$hostConfig.createStringDecoder;
var readPartialStringChunk = $$$hostConfig.readPartialStringChunk;
var readFinalStringChunk = $$$hostConfig.readFinalStringChunk;

var PENDING = 0;
var RESOLVED = 1;
var ERRORED = 2;
function createResponse(source) {
  var modelRoot = {};
  var rootChunk = createPendingChunk();
  definePendingProperty(modelRoot, 'model', rootChunk);
  var chunks = new Map();
  chunks.set(0, rootChunk);
  var response = {
    source: source,
    partialRow: '',
    modelRoot: modelRoot,
    chunks: chunks,
    fromJSON: function (key, value) {
      return parseFromJSON(response, this, key, value);
    }
  };

  if (supportsBinaryStreams) {
    response.stringDecoder = createStringDecoder();
  }

  return response;
}

function createPendingChunk() {
  var resolve = null;
  var promise = new Promise(function (r) {
    return resolve = r;
  });
  return {
    status: PENDING,
    value: promise,
    resolve: resolve
  };
}

function createErrorChunk(error) {
  return {
    status: ERRORED,
    value: error,
    resolve: null
  };
}

function triggerErrorOnChunk(chunk, error) {
  if (chunk.status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var resolve = chunk.resolve;
  var erroredChunk = chunk;
  erroredChunk.status = ERRORED;
  erroredChunk.value = error;
  erroredChunk.resolve = null;
  resolve();
}

function createResolvedChunk(value) {
  return {
    status: RESOLVED,
    value: value,
    resolve: null
  };
}

function resolveChunk(chunk, value) {
  if (chunk.status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var resolve = chunk.resolve;
  var resolvedChunk = chunk;
  resolvedChunk.status = RESOLVED;
  resolvedChunk.value = value;
  resolvedChunk.resolve = null;
  resolve();
} // Report that any missing chunks in the model is now going to throw this
// error upon read. Also notify any pending promises.


function reportGlobalError(response, error) {
  response.chunks.forEach(function (chunk) {
    // If this chunk was already resolved or errored, it won't
    // trigger an error but if it wasn't then we need to
    // because we won't be getting any new data to resolve it.
    triggerErrorOnChunk(chunk, error);
  });
}

function definePendingProperty(object, key, chunk) {
  Object.defineProperty(object, key, {
    configurable: false,
    enumerable: true,
    get: function () {
      if (chunk.status === RESOLVED) {
        return chunk.value;
      } else {
        throw chunk.value;
      }
    }
  });
}

function parseFromJSON(response, targetObj, key, value) {
  if (typeof value === 'string' && value[0] === '$') {
    if (value[1] === '$') {
      // This was an escaped string value.
      return value.substring(1);
    } else {
      var id = parseInt(value.substring(1), 16);
      var chunks = response.chunks;
      var chunk = chunks.get(id);

      if (!chunk) {
        chunk = createPendingChunk();
        chunks.set(id, chunk);
      } else if (chunk.status === RESOLVED) {
        return chunk.value;
      }

      definePendingProperty(targetObj, key, chunk);
      return undefined;
    }
  }

  return value;
}

function resolveJSONRow(response, id, json) {
  var model = JSON.parse(json, response.fromJSON);
  var chunks = response.chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createResolvedChunk(model));
  } else {
    resolveChunk(chunk, model);
  }
}

function processFullRow(response, row) {
  if (row === '') {
    return;
  }

  var tag = row[0];

  switch (tag) {
    case 'J':
      {
        var colon = row.indexOf(':', 1);
        var id = parseInt(row.substring(1, colon), 16);
        var json = row.substring(colon + 1);
        resolveJSONRow(response, id, json);
        return;
      }

    case 'E':
      {
        var _colon = row.indexOf(':', 1);

        var _id = parseInt(row.substring(1, _colon), 16);

        var _json = row.substring(_colon + 1);

        var errorInfo = JSON.parse(_json);
        var error = new Error(errorInfo.message);
        error.stack = errorInfo.stack;
        var chunks = response.chunks;
        var chunk = chunks.get(_id);

        if (!chunk) {
          chunks.set(_id, createErrorChunk(error));
        } else {
          triggerErrorOnChunk(chunk, error);
        }

        return;
      }

    default:
      {
        // Assume this is the root model.
        resolveJSONRow(response, 0, row);
        return;
      }
  }
}

function processStringChunk(response, chunk, offset) {
  var linebreak = chunk.indexOf('\n', offset);

  while (linebreak > -1) {
    var fullrow = response.partialRow + chunk.substring(offset, linebreak);
    processFullRow(response, fullrow);
    response.partialRow = '';
    offset = linebreak + 1;
    linebreak = chunk.indexOf('\n', offset);
  }

  response.partialRow += chunk.substring(offset);
}
function processBinaryChunk(response, chunk) {
  if (!supportsBinaryStreams) {
    throw new Error("This environment don't support binary chunks.");
  }

  var stringDecoder = response.stringDecoder;
  var linebreak = chunk.indexOf(10); // newline

  while (linebreak > -1) {
    var fullrow = response.partialRow + readFinalStringChunk(stringDecoder, chunk.subarray(0, linebreak));
    processFullRow(response, fullrow);
    response.partialRow = '';
    chunk = chunk.subarray(linebreak + 1);
    linebreak = chunk.indexOf(10); // newline
  }

  response.partialRow += readPartialStringChunk(stringDecoder, chunk);
}
function complete(response) {
  // In case there are any remaining unresolved chunks, they won't
  // be resolved now. So we need to issue an error to those.
  // Ideally we should be able to early bail out if we kept a
  // ref count of pending chunks.
  reportGlobalError(response, new Error('Connection closed.'));
}
function getModelRoot(response) {
  return response.modelRoot;
}

var ReactFlightClient = Object.freeze({
	createResponse: createResponse,
	reportGlobalError: reportGlobalError,
	processStringChunk: processStringChunk,
	processBinaryChunk: processBinaryChunk,
	complete: complete,
	getModelRoot: getModelRoot
});

// This entry point is intentionally not typed. It exists only for third-party
// renderers. The renderers we ship (such as React DOM) instead import a named
// "inline" entry point (for example, `react-server/inline.dom`). It uses
// the same code, but the Flow configuration redirects the host config to its
// real implementation so we can check it against exact intended host types.
//
// Only one renderer (the one you passed to `yarn flow <renderer>`) is fully
// type-checked at any given time. The Flow config maps the
// `react-server/inline.<renderer>` import (which is *not* Flow typed) to
// `react-server/inline-typed` (which *is*) for the current renderer.
// On CI, we run Flow checks for each renderer separately.


 // TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.


var reactFlight = ReactFlightClient.default || ReactFlightClient;

module.exports = reactFlight;
    var $$$renderer = module.exports;
    module.exports = $$$reconciler;
    return $$$renderer;
  };
}
