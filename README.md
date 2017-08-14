# 🎠 react-rotator

Flexible React component for composing rotators, carousels, slideshows and more.

## Install

Via [npm](https://npmjs.com/package/react-rotator):
```
npm install --save react-rotator
```

Via [Yarn](https://yarn.fyi/react-rotator):
```
yarn add react-rotator
```

## How to use

The `Rotator` is built with the intention of offering a truly flexible system for
building rotators, carousels, slideshows, etc. with a simplified interface for
managing various ways that these components can exist.

### Properties

* `index:Number` - Index of the currently active child.
* `onChange:Function` - Callback for when the index is changed internally, either
via a child or indicator.

### Children & Indicators

Each child within a `<Rotator />` instance has properties applied that allow
them to manage their own behavior based on those props. Along with callbacks that
can be passed in to control the rotator’s behavior.

In addition to the `[children]`, an optional `indicator` component can be passed
in via props that will be rendered alongside the `<Rotator />`’s children, which
allows for displaying indicators on progress, or building pagination controls for
the `<Rotator />`.

Here’s a breakdown of how `[children]` and an `indicator` is managed by the
component.

#### Children

The goal is to allow for maximum flexibility through composition. Feel free to
set whatever props your components need, but the following properties will be
applied/overwritten by the `<Rotator />` when rendered to the page.

##### Properties

* `index:Number` - Index of the child amongst the other children they are rendered with.
* `numChildren:Number` - Number of relative children that are being rendered with this child.
* `position:Number` - Position of the child in relation the the current `index` set on the `<Rotator />`.

>* If the `position` is `0`, it could be assumed that this is the “active” child.
>* If the `position` is `<0`, the child is positioned before the current “active” child.
>* If the `position` is `>0`, the child is positioned after the current “active” child.

* `onActive:Function` - Callback that could be triggered by the child when the child becomes "active".
This could have different meanings depending on the child, but `onActive` will
update the `<Rotator />` to set that child at position `0`.
* `onFinish:Function` - Callback that could be triggered by the child, in the event that the child is
managing it’s status or responsible for initiating progression within the `<Rotator />`.

##### Example

```
import Rotator from 'react-rotator';

...

  render() {
    return (
      <Rotator>

      </Rotator>
    );
  }

...

```

#### Indicator

An indicator component can be composed within the `<Rotator />` via the `indicator` prop.
This makes it really easy to pass in a component that will reflect the current status
of the rotator, while also allowing for callbacks to be called to control the
state of the rotator.

You can make your own paging indicators, or I’ve created a companion package that contains
some common paging indicator components that you can use, [react-paging-indicators](https://github.com/ryanhefner/react-paging-indicators).

##### Properties

* `index:Number` - Index of the currently selected child.
* `onChange:Function` - Callback for when the indicator changes, passing its
`index` to set the new `index` state in the `<Rotator />`.

##### Example

```
import Rotator from 'react-rotator';
import {DotsIndicator} from 'react-paging-indicators';

...

  render() {
    return (
      <Rotator
        indicator={<DotsIndicator />}
      >

      </Rotator>
    );
  }

...

```

## License

[MIT](LICENSE)
