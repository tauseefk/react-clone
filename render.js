;(function (React = {}) {

  function render(element, parentDom) {
    const {type, props} = element;

    const isListener = name => name.startsWith("on");
    const isTextElement = type === TEXT_ELEMENT;
    const isAttribute = name => !isListener(name) && name != "children";

    const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

    // adding event listeners
    Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      // props[name] should be the event handler function
      dom.addEventListener(eventType, props[name]);
    });

    // setting attributes
    Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });

    const childElements = props.children || [];
    childElements.forEach((el) => {
      render(el, dom);
    });

    parentDom.appendChild(dom);
  }

  React.render = render;
})(React)
