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
  },
  setContents: function(elm, contents){
    elm.innerHTML = ''
    elm.appendChild(contents)
  },
  append: function(parent, child){
    parent.appendChild(child)
  }
}

addTagFunctions()
function addTagFunctions(){
  var tags = 'a abbracronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dir div dfn dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt u ul'.split(' ')

  for (var i = 0; i < tags.length; i++){
    var tag = tags[i]
    DOM[tag] = createElementFunc(tag)
  }

  function createElementFunc(tag){
    return function(thing){
      var elm = document.createElement(tag)
      if (typeof thing === 'string'){
        DOM.setText(elm, thing)
      }else if (thing.nodeType){
        for (var i = 0; i < arguments.length; i++){
          elm.appendChild(arguments[i])
        }
      }else{
        var attrs = thing
        for (var key in attrs){
          elm.setAttribute(key, attrs[key])
        }
      }
      return elm
    }
  }
}

addFormInputConvinienceFunctions()
function addFormInputConvinienceFunctions(){
  var inputTypes = 'text radio checkbox hidden search'.split(' ')

  for (var i = 0; i < inputTypes.length; i++){
    var type = inputTypes[i]
    DOM.input[type] = createInputFunc(type)
  }

  function createInputFunc(type){
    return function(thing){
      var input = document.createElement('input')
      input.type = type
      var attrs = thing
      if (attrs){
        for (var key in attrs){
          input.setAttribute(key, attrs[key])
        }
      }
      return input
    }
  }
}

module.exports = DOM
