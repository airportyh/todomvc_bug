var bug = require('bug')
var extend = require('./extend')
var DOM = require('./dom')
var Task = require('./task')

function TaskController(task){
  this.task = task
  this.elm = DOM.li({'data-id': task.id})
  this.enterViewMode()
}
extend(TaskController.prototype, bug)
extend(TaskController.prototype, {
  enterViewMode: function(){
    DOM.setContents(this.elm, DOM.div(
      this.checkbox = DOM.input.checkbox(),
      this.label = DOM.label(this.task.name)
    ))
    this.attach()
  },
  enterEditMode: function(){
    DOM.setContents(this.elm, DOM.div(
      this.field = DOM.input.text({value: this.task.name})
    ))
    this.field.select()
    this.attach()
  },
  "checkbox:onclick": function(e){
    this.task.toggleDone()
    this.elm.className = this.task.done ? 'done' : ''
  },
  "elm:ondblclick": function(e){
    var id = this.elm.getAttribute('data-id')
    var task = Task.get(id)
    this.enterEditMode()
  },
  "field:onkeypress": function(e){
    if (e.keyCode === 13){
      this.task.name = this.field.value
      this.enterViewMode()
    }
  }
})

module.exports = TaskController

