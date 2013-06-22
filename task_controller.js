define(function(require, exports, module){

  var bug = require('bug')
  var extend = require('./extend')
  var DOM = require('./DOM')
  var Task = require('./task')

  function TaskController(task){
    this.task = task
    var li = this.elm = document.createElement('li')
    li.setAttribute('data-id', task.id)
    this.enterViewMode()
    this.attach()
  }
  extend(TaskController.prototype, bug)
  extend(TaskController.prototype, {
    enterViewMode: function(){
      var li = this.elm
      this.elm.innerHTML = ''
      var checkbox = this.checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      li.appendChild(checkbox)
      var label = this.label = document.createElement('label')
      DOM.setText(label, this.task.name)
      li.appendChild(label)
      this.attach()
    },
    "checkbox:onclick": function(e){
      if (this.elm.className === 'done'){
        this.elm.className = ''
      }else{
        this.elm.className = 'done'
      }
    },
    "elm:ondblclick": function(e){
      var id = this.elm.getAttribute('data-id')
      var task = Task.get(id)
      this.enterEditMode()
    },
    enterEditMode: function(){
      this.elm.innerHTML = ''
      var field = this.field = document.createElement('input')
      field.type = 'text'
      field.value = this.task.name
      this.elm.appendChild(field)
      field.select()
      this.attach()
    },
    "field:onkeypress": function(e){
      if (e.keyCode === 13){
        this.task.name = this.field.value
        this.enterViewMode()
      }
    }
  })

  module.exports = TaskController

})