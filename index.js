require.config({
  paths: {
    bug: 'components/bug/index'
  }
})

require(['app'], function(App){

  app = new App
  app.start()

})