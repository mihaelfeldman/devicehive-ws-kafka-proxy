'use strict';

const WebSocket = require(`ws`);
const debug = require(`debug`)(`ws-kafka:ws-extension`);

WebSocket.prototype.shutDown = function (resultHandler) {
  // debug(`Shutting down ws & kafka ${this.cnt}`);
  this.shutDownProducer(resultHandler);
  this.shutDownConsumer(resultHandler);
};

WebSocket.prototype.shutDownProducer = function (resultHandler) {
  this._shutDownClient(`producer`, resultHandler);
};

WebSocket.prototype.shutDownConsumer = function (resultHandler) {
  this._shutDownClient(`consumer`, resultHandler);
};

WebSocket.prototype._shutDownClient = function (type, resultHandler = null) {
  if (this[type]) {
    this[type].close(resultHandler);
    // debug(`shutting down ${type}`);
    this[type] = null;
  }
};

module.exports = WebSocket;