const moduleName = 'simplifield.dragndrop';

export default angular
  .module(moduleName, [])
  .factory('sfDragNDropService', DragNDropService)
  .directive('sfDrop', ['$parse', 'sfDragNDropService', DropDirective])
  .directive('sfDrag', ['$parse', 'sfDragNDropService', DragDirective])
  .name;

function DragNDropService() {
  const SESSION_KEYS = [
    'item',
    'target',
    'previous',
    'itemIndex',
    'targetIndex',
    'previousIndex',
  ];
  const sfDragNDropService = {
    session: {},
    reset: function reset() {
      Object.keys(sfDragNDropService.session).forEach((key) => {
        if('type' === key) {
          sfDragNDropService.session.type = '';
        } else if (SESSION_KEYS.includes(key)) {
          sfDragNDropService.session[key] = null;
        } else {
          delete sfDragNDropService.session[key];
        }
      });
    }
  };

  sfDragNDropService.reset();

  return sfDragNDropService;
}

function DropDirective($parse, sfDragNDropService) {
  return {
    restrict: 'A',
    link: ($scope, element, attrs) => {
      // Keep a ref to the dragged element
     	const item = $parse(attrs.sfDrop);
      // Setting callbacks
      const onDropCallback = $parse(attrs.sfOnDrop);
      const onDragEnterCallback = $parse(attrs.sfOnDragEnter);
      const onDragLeaveCallback = $parse(attrs.sfOnDragLeave);
      const onDragOverCallback = $parse(attrs.sfOnDragOver);
      // Bind drag events
      element.bind('dragenter', (evt) => {
        if(sfDragNDropService.session.type !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.session.target = item($scope);
        sfDragNDropService.session.targetIndex = onDragEnterCallback($scope, {
          $type: sfDragNDropService.session.type,
          $item: sfDragNDropService.session.item,
          $itemIndex: sfDragNDropService.session.itemIndex,
          $target: sfDragNDropService.session.target,
          $targetIndex: sfDragNDropService.session.targetIndex,
          $session: sfDragNDropService.session
        });
        $scope.$apply();
      });
      element.bind('dragleave', (evt) => {
        if(sfDragNDropService.session.type !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.session.previous = item($scope);
        sfDragNDropService.session.previousIndex = sfDragNDropService.session.targetIndex;
        onDragLeaveCallback($scope, {
          $type: sfDragNDropService.session.type,
          $item: sfDragNDropService.session.item,
          $itemIndex: sfDragNDropService.session.itemIndex,
          $previous: sfDragNDropService.session.previous,
          $previousIndex: sfDragNDropService.session.previousIndex,
          $session: sfDragNDropService.session
        });

        $scope.$apply();
      });
      element.bind('dragover', (evt) => {
        if(sfDragNDropService.session.type !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.session.target = item($scope);
        onDragOverCallback($scope, {
          $type: sfDragNDropService.session.type,
          $item: sfDragNDropService.session.item,
          $itemIndex: sfDragNDropService.session.itemIndex,
          $target: sfDragNDropService.session.target,
          $targetIndex: sfDragNDropService.session.targetIndex,
          $previous: sfDragNDropService.session.target,
          $previousIndex: sfDragNDropService.session.targetIndex,
          $session: sfDragNDropService.session
        });
        $scope.$apply();
      });
      element.bind('drop', (evt) => {
        if(sfDragNDropService.session.type !== (attrs.sfDragType || 'all')) {
          return;
        }
        evt.preventDefault();
        sfDragNDropService.session.target = item($scope);
        onDropCallback($scope, {
          $type: sfDragNDropService.session.type,
          $item: sfDragNDropService.session.item,
          $itemIndex: sfDragNDropService.session.itemIndex,
          $target: sfDragNDropService.session.target,
          $targetIndex: sfDragNDropService.session.targetIndex,
          $previous: sfDragNDropService.session.previous,
          $previousIndex: sfDragNDropService.session.previousIndex,
          $session: sfDragNDropService.session
        });
        $scope.$apply();
      });
    }
  };

}

function DragDirective($parse, sfDragNDropService) {
  return {
    restrict: 'A',
    link: ($scope, element, attrs) => {
      // Keep a ref to the dragged model value
     	const item = $parse(attrs.sfDrag);

      // Try to get dragged datas
     	const getDragData = $parse(attrs.sfDragData);

      // Setting callbacks
      const dragGenerator = attrs.sfDragGenerator ?
        $parse(attrs.sfDragGenerator) :
        null;

      // Setting callbacks
      const onDragCallback = $parse(attrs.sfOnDrag);
      const onDragEndCallback = $parse(attrs.sfOnDragEnd);

      // Make the element draggable
      if(attrs.sfDraggable) {
        $scope.$watch(
          () => {
            return $parse(attrs.sfDraggable)($scope, {
              $type: sfDragNDropService.session.type,
              $item: sfDragNDropService.session.item,
              $itemIndex: sfDragNDropService.session.itemIndex,
              $session: sfDragNDropService.session
            });
          },
          (newVal, oldVal) => {
            attrs.$set('draggable', (!!newVal).toString());
          }
        );
      } else {
        attrs.$set('draggable', 'true');
      }

      // Bind drag events
      element.bind('dragstart', (evt) => {
        var draggedItem = item($scope);
        function computeDragItem() {
           var itemIndex = onDragCallback($scope, {
            $item: draggedItem,
            $session: sfDragNDropService.session
          });
          if(-1 !== itemIndex) {
            sfDragNDropService.session.itemIndex = itemIndex;
            sfDragNDropService.session.item = draggedItem;
            sfDragNDropService.session.type = attrs.sfDragType || 'all';
            sfDragNDropService.session.mime = attrs.sfDragMime || 'text/plain';
            sfDragNDropService.session.data = getDragData($scope) || '' + itemIndex;
            evt.stopPropagation();
            (evt.dataTransfer || evt.originalEvent.dataTransfer)
              .setData(sfDragNDropService.session.mime, sfDragNDropService.session.data);
            (evt.dataTransfer || evt.originalEvent.dataTransfer)
              .effectAllowed = attrs.sfDragEffect || 'move';
          }
        }
        if(dragGenerator) {
          draggedItem = dragGenerator($scope, {
            $type: attrs.sfDragType || 'all',
            $item: draggedItem
          });
        }
        if(draggedItem.then) {
          draggedItem.then((value) => {
            draggedItem = value;
            computeDragItem();
          });
        } else {
          computeDragItem();
        }
        $scope.$apply();
      });

      element.bind('dragend', (evt) => {
        onDragEndCallback($scope, {
          $type: sfDragNDropService.session.type,
          $item: sfDragNDropService.session.item,
          $itemIndex: sfDragNDropService.session.itemIndex,
          $previous: sfDragNDropService.session.previous,
          $previousIndex: sfDragNDropService.session.previousIndex,
          $session: sfDragNDropService.session
        });
        sfDragNDropService.reset();
        $scope.$apply();
      });
    }
  };
}
