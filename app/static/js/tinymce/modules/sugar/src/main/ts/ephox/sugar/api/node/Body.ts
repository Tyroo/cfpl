import { document, Document, HTMLElement, Node as DomNode } from '@ephox/dom-globals';
import Element from './Element';
import * as Node from './Node';

// Node.contains() is very, very, very good performance
// http://jsperf.com/closest-vs-contains/5
const inBody = (element: Element<DomNode>) => {
  // Technically this is only required on IE, where contains() returns false for text nodes.
  // But it's cheap enough to run everywhere and Sugar doesn't have platform detection (yet).
  const dom = Node.isText(element) ? element.dom().parentNode : element.dom();

  // use ownerDocument.body to ensure this works inside iframes.
  // Normally contains is bad because an element "contains" itself, but here we want that.
  return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
};

const body = () => getBody(Element.fromDom(document));

const getBody = (doc: Element<Document>): Element<HTMLElement> => {
  const b = doc.dom().body;
  if (b === null || b === undefined) {
    throw new Error('Body is not available yet');
  }
  return Element.fromDom(b);
};

export {
  body,
  getBody,
  inBody
};
