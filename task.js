function Task(name){
  this.id = Task.id++
  this.name = name
  Task.tasks[this.id] = this
}
Task.id = 0
Task.tasks = {}
Task.get = function(id){
  return Task.tasks[id]
}

module.exports = Task

