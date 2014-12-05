describe('sfDragNDrop', function () {
  var assert = chai.assert;



  describe('service', function() {

    beforeEach(module('simplifield.dragndrop'));

    it('should exist',
      inject(function(sfDragNDropService) {

      assert(sfDragNDropService);

    }));

  });

});
