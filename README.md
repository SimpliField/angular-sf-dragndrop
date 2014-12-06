# sf-dragndrop
A drag and drop module enabling drag and drop without modifying your model
 letting your controller responsible of the model changes.

[![NPM version](https://badge.fury.io/js/angular-sf-dragndrop.png)](https://npmjs.org/package/angular-sf-dragndrop) [![Build status](https://secure.travis-ci.org/SimpliField/angular-sf-dragndrop.png)](https://travis-ci.org/SimpliField/angular-sf-dragndrop) [![Dependency Status](https://david-dm.org/SimpliField/angular-sf-dragndrop.png)](https://david-dm.org/SimpliField/angular-sf-dragndrop) [![devDependency Status](https://david-dm.org/SimpliField/angular-sf-dragndrop/dev-status.png)](https://david-dm.org/SimpliField/angular-sf-dragndrop#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/SimpliField/angular-sf-dragndrop/badge.png?branch=master)](https://coveralls.io/r/SimpliField/angular-sf-dragndrop?branch=master) [![Code Climate](https://codeclimate.com/github/SimpliField/angular-sf-dragndrop.png)](https://codeclimate.com/github/SimpliField/angular-sf-dragndrop)

[Here is a sample usage you can play with](http://embed.plnkr.co/d7Q99447CPERgaBJwuD8/preview).

## Setting a dragable element (sfDrag directive)

```html
<ANY sf-drag="myModelDraggableValue"
  sf-drag-generator="myModelDraggableValue($item)"
  sf-drag-type="myDragFamily"
  sf-drag-class="myDragClass"
  sf-on-drag="onDragCallback($item, $type)"
  sf-on-drag-end="onDragEndCallback($item, $target, $type, $returnValue)">
```

### sf-drag
The name of the `$scope` value on wich the draggable element is based. Behind
 any draggable element there must be a value in the parent scope attached.

### sf-drag-generator
The name of the `$scope` function that will generate the value on wich the
 draggable element is based. On each drag, this function will be called and
 receive the `sf-drag` resolved value. The returned result will then be used
 as the value associated xwith the dragged item.

### sf-drag-type
The type of the dragged object.

### sf-drag-class
The class that should be applied when the draggable element is currently dragged.

### sf-on-drag
The callback in the parent `$scope` that will be executed on drag. It will take
 in argument the `sf-drag` value (`$item` parameter) and the type of
 drag (`$type`).

If for any reason, you do not want the object to be dragged, return `-1`. In any
 other case, provide a value, or not.

The returned value will be brought to you in each other callback. It can be
 useful to provide an the start index of the element in the list in order to
 live move it and then put it back in its old place when the drag finally fails.

### sf-on-drag-end
The callback in the parent controller that will be executed on drag end. It will
 take in argument the `sf-drag` value (`$item` parameter), the eventual
 targetted value (`$target` parameter, see `sf-drop` above), the `sf-on-drag`
  returned value (`$returnValue` parameter) and the type of drag (`$type`).

## Setting a drop target (sfDrop directive)

```html
<ANY sf-drop="myModelDropableValue"
  sf-drag-type="myDragFamily"
  sf-drag-over-class="myDragClass"
  sf-on-drag-enter="onDragEnterCallback($item, $target, $type, $returnValue)"
  sf-on-drag-leave="onDragLeaveCallback($item, $target, $type, $returnValue)"
  sf-on-drop="onDropCallback($item, $target, $type, $returnValue)">
```

### sf-drop
The name of the `$scope` value on wich the drop target element is based.

### sf-drag-type
The type of the dragged object it can receive.

### sf-drag-class
The class that should be applied when the dropable element has a valid
 draggable element maintained over it.

### sf-on-drag-enter
The callback in the parent `$scope` that will be executed when a valid draggable
 element will enter on the target element. It will take in argument the
 `sf-drag` value (`$item` parameter), the targetted value (`$target`
 parameter, see `sf-drop` above), the `sf-on-drag` returned value
 (`$returnValue` parameter) and the type of drag (`$type`).

### sf-on-drag-leave
The callback in the parent `$scope` that will be executed when a valid draggable
 element will exit on the target element. It will take in argument the
 `sf-drag` value (`$item` parameter), the targetted value (`$target`
 parameter, see `sf-drop` above), the `sf-on-drag` returned value
 (`$returnValue` parameter) and the type of drag (`$type`).

### sf-on-drop
The callback in the parent controller that will be executed on drop. It will
 take in argument the `sf-drag` value (`$item` parameter), the eventual
 targetted value (`$target` parameter, see `sf-drop` above), the `sf-on-drag`
  returned value (`$returnValue` parameter) and the type of drag (`$type`).

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
