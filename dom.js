define(function(require, exports, module){
  var DOM = {
    setText: function(elm, text){
      if ('textContent' in elm){
        elm.textContent = text
      }else{
        elm.innerText = text
      }
    },
    eventTarget: function(evt){
      return evt.target || evt.srcElement
    }
  }
  module.exports = DOM
})