define(function(require, exports, module){

  var bug = require('bug')
  var extend = require('./extend')
  var DOM = require('./dom')
  var Task = require('./task')

  function App(){
    this.tasks = []

  }
  extend(App.prototype, bug)
  extend(App.prototype, {
    start: function(){

      var field = this.field = document.createElement('input')
      field.type = 'text'
      field.placeholder = 'What to do?'
      document.body.appendChild(field)

      var ul = this.ul = document.createElement('ul')
      document.body.appendChild(ul)

      this.attach()
    },
    "field:onkeypress": function(e){
      if (e.keyCode === 13){
        this.newTask(this.field.value)
        this.field.value = ''
      }
    },
    "ul:ondblclick": function(e){
      var target = DOM.eventTarget(e)
      var id = target.getAttribute('data-id')
      var task = Task.get(id)
      this.editTask(task, target)
    },
    newTask: function(name){
      var task = new Task(name)
      this.tasks.push(task)
      var li = document.createElement('li')
      li.setAttribute('data-id', task.id)
      DOM.setText(li, name)
      this.ul.appendChild(li)
    },
    editTask: function(task, li){
      this.currentlyEditingTask = task
      this.currentlyEditingTaskLi = li
      li.innerHTML = ''
      var field = this.currentlyEditingTaskField = document.createElement('input')
      field.type = 'text'
      field.value = task.name
      li.appendChild(field)
      field.select()
      this.attach()
    },
    "currentlyEditingTaskField:onkeypress": function(e){
      if (e.keyCode === 13){
        var name = DOM.eventTarget(e).value
        this.currentlyEditingTask.name = name
        DOM.setText(this.currentlyEditingTaskLi, name)

      }
    }
  })

  module.exports = App

})