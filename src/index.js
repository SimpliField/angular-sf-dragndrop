angular.module('simplifield.dragndrop', [
]).factory('sfDragNDropService', function DragNDropService() {
  return {
    dragType: '',
    draggedItem: null,
    targettedItem: null,
    prevTargettedItem: null
  };
}).directive("sfDrop", ['$parse', 'sfDragNDropService',
  function DropDirective($parse, sfDragNDropService) {

  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      // Keep a ref to the dragged element
     	var item = $parse(attrs.sfDrop);
      // Setting callbacks
      var onDropCallback = $parse(attrs.sfOnDrop);
      var onDragEnterCallback = $parse(attrs.sfOnDragEnter);
      var onDragLeaveCallback = $parse(attrs.sfOnDragLeave);
      var onDragOverCallback = $parse(attrs.sfOnDragOver);
      // Bind drag events
      element.bind('dragenter', function(evt) {
        if(sfDragNDropService.dragType !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.targettedItem = item($scope);
        element.addClass(attrs.sfDragOverClass || 'targetted');
        onDragEnterCallback($scope, {
          $item: sfDragNDropService.draggedItem,
          $target: item($scope),
          $type: sfDragNDropService.dragType,
          $returnValue: sfDragNDropService.dragCbReturnValue
        });
        $scope.$apply();
      });
      element.bind('dragleave', function(evt) {
        if(sfDragNDropService.dragType !== (attrs.sfDragType || 'all')) {
          return;
        }
        element.removeClass(attrs.sfDragOverClass || 'targetted');
        sfDragNDropService.prevTargettedItem = item($scope);
        sfDragNDropService.targettedItem = null;
        onDragEnterCallback($scope, {
          $item: sfDragNDropService.draggedItem,
          $target: sfDragNDropService.prevTargettedItem,
          $type: sfDragNDropService.dragType,
          $returnValue: sfDragNDropService.dragCbReturnValue
        });
        $scope.$apply();
      });
      element.bind('dragover', function(evt) {
        if(sfDragNDropService.dragType !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.targettedItem = item($scope);
        element.addClass(attrs.sfDragOverClass || 'targetted');
        onDragOverCallback($scope, {
          $item: sfDragNDropService.draggedItem,
          $target: sfDragNDropService.targettedItem,
          $type: sfDragNDropService.dragType,
          $returnValue: sfDragNDropService.dragCbReturnValue
        });
        $scope.$apply();
      });
      element.bind('drop', function(evt) {
        if(sfDragNDropService.dragType !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.targettedItem = item($scope);
        element.removeClass(attrs.sfDragOverClass || 'targetted');
        onDropCallback($scope, {
          $item: sfDragNDropService.draggedItem,
          $target: sfDragNDropService.targettedItem,
          $type: sfDragNDropService.dragType
        });
        $scope.$apply();
      });
    }
  };

}]).directive('sfDrag', ['$parse', 'sfDragNDropService',
  function DragDirective($parse, sfDragNDropService) {

  return {
    restrict: 'A',
    link: function($scope, element, attrs)  {
      // Keep a ref to the drag model
     	var item = $parse(attrs.sfDrag);
      // Setting callbacks
      var dragGenerator = attrs.sfDragGenerator ?
        $parse(attrs.sfDragGenerator) :
        null;
      // Setting callbacks
      var onDragCallback = $parse(attrs.sfOnDrag);
      var onDragEndCallback = $parse(attrs.sfOnDragEnd);
      // Make the element draggable
      attrs.$set('draggable', 'true');
      // Bind drag events
      element.bind('dragstart', function(evt) {
        var $item = item($scope);
        function computeDragItem() {
          sfDragNDropService.dragCbReturnValue = onDragCallback($scope, {
            $item: $item
          });
          if(-1 !== sfDragNDropService.dragCbReturnValue) {
            sfDragNDropService.draggedItem = $item;
            sfDragNDropService.dragType = attrs.sfDragType || 'all';
            element.addClass(attrs.sfDragClass || 'dragged');
            evt.stopPropagation();
            (evt.dataTransfer || evt.originalEvent.dataTransfer).effectAllowed = 'move';
          }
        }
        if(dragGenerator) {
          $item = dragGenerator($scope, {
            $item: $item
          });
        }
        if($item.then) {
          $item.then(function(value) {
            $item = value;
            computeDragItem();
          });
        } else {
          computeDragItem();
        }
        $scope.$apply();
      });
      element.bind('dragend', function(evt) {
        sfDragNDropService.targettedItem = null;
        sfDragNDropService.draggedItem = null;
        sfDragNDropService.dragType = '';
        sfDragNDropService.dragCbReturnValue = null;
        element.removeClass(attrs.sfDragClass || 'dragged');
        onDragEndCallback($scope, {
          $item: sfDragNDropService.draggedItem,
          $type: sfDragNDropService.dragType
        });
        $scope.$apply();
      });
    }
  };
}]);

