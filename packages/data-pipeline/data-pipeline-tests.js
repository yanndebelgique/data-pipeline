if(Meteor.isClient){
  // Write your tests here!
// Here is an example.
  Tinytest.add('example', function (test) {

    var datapipe = new DataPipe();


    datapipe.setFetch(function () {
      return [1,2,3,4];
    });

    datapipe.fetch();

    state = datapipe.getState();

    var step = function (res) {
      return res.map(r => {return r*r})
    }

    datapipe.addStep(step);
    datapipe.addStep(function(res){return res;});


    datapipe.process();
    //test.equal(state, 'data processed');

    var res = datapipe.getResult();



    test.equal(res, step([1,2,3,4]));
  });

}