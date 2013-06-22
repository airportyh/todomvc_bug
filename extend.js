define(function(require, exports, module){
  module.exports = extend
  function extend(dst, src){
    for (var key in src){
      dst[key] = src[key]
    }
  }
})