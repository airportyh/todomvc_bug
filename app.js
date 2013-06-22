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
    DOM.setContents(document.body, DOM.div(
      this.field = DOM.input.text({placeholder: 'What to do?'}),
      this.ul = document.createElement('ul')
    ))
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
    var taskController = new TaskController(task)
    DOM.append(this.ul, taskController.elm)
  }
})

module.exports = App
