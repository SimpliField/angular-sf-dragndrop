# sf-dragndrop
A drag and drop module enabling drag and drop without modifying your model
 letting your controller responsible of the model changes.

[![NPM version](https://badge.fury.io/js/angular-sf-dragndrop.png)](https://npmjs.org/package/angular-sf-dragndrop) [![Build status](https://secure.travis-ci.org/SimpliField/angular-sf-dragndrop.png)](https://travis-ci.org/SimpliField/angular-sf-dragndrop) [![Dependency Status](https://david-dm.org/SimpliField/angular-sf-dragndrop.png)](https://david-dm.org/SimpliField/angular-sf-dragndrop) [![devDependency Status](https://david-dm.org/SimpliField/angular-sf-dragndrop/dev-status.png)](https://david-dm.org/SimpliField/angular-sf-dragndrop#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/SimpliField/angular-sf-dragndrop/badge.png?branch=master)](https://coveralls.io/r/SimpliField/angular-sf-dragndrop?branch=master) [![Code Climate](https://codeclimate.com/github/SimpliField/angular-sf-dragndrop.png)](https://codeclimate.com/github/SimpliField/angular-sf-dragndrop)

[Here is a sample usage you can play with](http://plnkr.co/edit/8Ey9nKapjDhGy0s2sSRI?p=preview).

## Setting a dragable item (sfDrag directive)

```html
<ANY sf-drag="myModelDraggableValue"
  sf-drag-type="myDragFamily"
  sf-on-drag="onDragCallback($type, $item, $session)"
  sf-drag-generator="spawnDraggedItem($item)"
  sf-on-drag-end="onDragEndCallback($type, $item, $itemIndex, $target, $targetIndex, $session)"
  sf-drag-effect="none|copy|move|link|copyMove|copyLink|all">
```

### sf-drag
The name of the `$scope` value on wich the draggable element is based. Behind
 any draggable element there must be a value in the parent scope attached.

### sf-drag-type
The type of the dragged object. This allows to use nested element drag and drop
 to simply work as expected.

### sf-drag-generator
The name of the `$scope` function that will generate the value on wich the
 draggable element is based. On each drag, this function will be called and
 receive the `sf-drag` resolved value. The returned result will then be used
 as the value associated with the dragged item.

### sf-on-drag
The callback in the parent `$scope` that will be executed on drag. It will take
 in argument the `sf-drag` value (`$item` parameter) and the type of
 drag (`$type`).

If for any reason, you do not want the object to be dragged, return `-1`. In any
 other case, you can provide a value, or not.

The returned value will be brought to you in each other callback under the
 `itemIndex` name. It can be useful to provide the start index of an item
 in a list in order to live move it and then put it back in its old place when
 the drag finally fails.

### sf-on-drag-end
The callback in the parent controller that will be executed on drag end. It will
 take in argument the `sf-drag` value (`$item` parameter), the eventual
 targetted value (`$target` parameter, see `sf-drop` above), the `sf-on-drag`
  returned value (`$targetIndex` parameter) and the type of drag (`$type`).

### sf-drag-effect
Set the type of effect the drag allows,
  [see MDN documentation for more informations](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#drageffects).

### sf-drag-data
Allow to provide datas for the drag operation, defaults to the item index. It may
 be usefull if your dragged item is a blog post but you want the user to be able
 to drag it to the address bar. The Plunker given above illustrate this ability.

[Read this article](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types)
 to view which drag types make sense for Browser/OS level interactions.


### sf-drag-mime
Specify the MIME type of above datas, defaults to 'text/plain'.

## Setting a drop target (sfDrop directive)

```html
<ANY sf-drop="myModelDropableValue"
  sf-drag-type="myDragFamily"
  sf-on-drag-enter="onDragEnterCallback($type, $item, $itemIndex, $target, $targetIndex, $session)"
  sf-on-drag-leave="onDragLeaveCallback($type, $item, $itemIndex, $previous, $previousIndex, $session)"
  sf-on-drop="onDropCallback($type, $item, $itemIndex, $target, $targetIndex, $session)">
```

### sf-drop
The name of the `$scope` value on wich the drop target element is based.

### sf-drag-type
The type of the dragged object it can receive.

### sf-on-drag-enter
The callback in the parent `$scope` that will be executed when a valid draggable
 element will enter on the target element. It will take in argument the
 `sf-drag` value (`$item` parameter), the targetted value (`$target`
 parameter, see `sf-drop` above), the `sf-on-drag` returned value
 (`$targetIndex` parameter) and the type of drag (`$type`).

### sf-on-drag-leave
The callback in the parent `$scope` that will be executed when a valid draggable
 element will exit on the target element. It will take in argument the
 `sf-drag` value (`$item` parameter), the targetted value (`$target`
 parameter, see `sf-drop` above), the `sf-on-drag` returned value
 (`$targetIndex` parameter) and the type of drag (`$type`).

### sf-on-drop
The callback in the parent controller that will be executed on drop. It will
 take in argument the `sf-drag` value (`$item` parameter), the eventual
 targetted value (`$target` parameter, see `sf-drop` above), the `sf-on-drag`
  returned value (`$targetIndex` parameter) and the type of drag (`$type`).
  
## sfDragNDropService

This module internally uses a service in order to store drag and drop sessions.
 It can be usefull to access it from your controllers like it is done in the
 sample drag and drop implementation given above.

### sfDragNDropService.session:Object

An object containing drag and drop session properties. Your can add some by your
 own but you should never erase the `sfDragNDropService.session` reference
 without knowing what you're doing.

### sfDragNDropService.reset()

Allow to reset the drag and drop session.

## Contribute
To contribute to this project, first run the following to setup the development
 environment:
```sh
npm install
bower install
```

Then, run the tests and debug with Karma:
```sh
npm run dev
```

## Stats

[![NPM](https://nodei.co/npm/angular-sf-dragndrop.png?downloads=true&stars=true)](https://nodei.co/npm/angular-sf-dragndrop/)
[![NPM](https://nodei.co/npm-dl/angular-sf-dragndrop.png)](https://nodei.co/npm/angular-sf-dragndrop/)
