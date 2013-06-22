function Task(name){
  this.id = Task.id++
  this.name = name
  this.done = false
  Task.tasks[this.id] = this
}
Task.prototype.toggleDone = function(){
  this.done = !this.done
}
Task.id = 0
Task.tasks = {}
Task.get = function(id){
  return Task.tasks[id]
}

module.exports = Task

