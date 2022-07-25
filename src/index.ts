import { createTraverse } from '@codecb/tree-traverse';
import { Node } from 'estree';

const isNode = (value: unknown): value is Node =>
  !!value && typeof value === 'object' && 'type' in value;

const getChildren = function* (node: Node): Generator<Node> {
  for (const key in node) {
    const value = node[key as keyof Node];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          yield item;
        }
      }
    }
    if (isNode(value)) {
      yield value;
    }
  }
};

export const traverse = createTraverse(getChildren);
