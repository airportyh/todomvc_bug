var bug = require('bug')
var extend = require('./extend')
var DOM = require('./dom')
var Task = require('./task')
var TaskController = require('./task_controller')

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
  newTask: function(name){
    var task = new Task(name)
    this.tasks.push(task)
    this.taskController = new TaskController(task)
    this.ul.appendChild(this.taskController.elm)
  }
})

module.exports = App
