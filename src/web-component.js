/**
 * web-component.js
 *
 * Wrapper for creating Custom Elements V1 from the W3C Web Component spec
 * using React components. This let's us use react components as autonomous
 * custom elements.
 *
 * This wrapper is implemented as a Higher Order Component, although doesn't
 * change the behavior of the target. It has the side effect of registering the
 * React component as a Custom Element.
 *
 * Note: there is no support for customized built-in elements here. React
 * doesn't really have a concept of extending a built-in element, so we don't
 * bother trying.
 */
import 'document-register-element';
import React from 'react';
import ReactDOM from 'react-dom';

// The default attribute parser converts the NamedNodeMap to a plain old
// object for use as React component props.
function defaultParseAttributes(attributes) {
  const reducer = (memo, attribute) => (
    { ...memo, [attribute.name]: attribute.value }
  );

  return Array.prototype.reduce.call(attributes, reducer, {});
}

function webComponent(Component, customElementName, CustomElement) {
  // Define a one-off class to register as the custom element
  class WebComponent extends HTMLElement {
    connectedCallback() {
      // Parse the HTML attributes into props.
      // TODO we should infer the parsing based on `propTypes` instead of
      // having the class provide a `parseAttributes` method.
      const props = typeof Component.parseAttributes === 'function' ?
        Component.parseAttributes(this.attributes) :
        defaultParseAttributes(this.attributes);

      // Instantiate the React component to be inserted into the DOM.
      // TODO Can we just pass `this.children` to React and it will just work?
      const component = React.createElement(Component, props, null);

      // We *could* use the shadow DOM here, but a) browser support is still
      // limited and b) our CSS architecture produces a site-wide stylesheet
      // which would not apply to the shadow DOM, hence each element would
      // have to provide its own styles. Let's avoid that for now and keep
      // everything in the host DOM.
      ReactDOM.render(component, this);
    }
  }

  customElements.define(customElementName, CustomElement || WebComponent);

  // Return the React component so exports still work
  return Component;
}

export default webComponent;
