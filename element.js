;(function(React = {}) {

  function createElement(type, config, ...args) {
    const props = Object.assign ({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];

    props.children = rawChildren
    .filter(child => child != null && child !== undefined)
    .map(child => child instanceof Object ? child : createTextElement(child));

    return { type, props };
  }

  function createTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value });
  }

  React.createElement = createElement;
})(React)
