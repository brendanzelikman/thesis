import Coll from "./Coll";
import { range } from "lodash";
import { removeWhitespace } from "../util";

export default class System {
  constructor(head = new Coll(range(60, 72))) {
    this.head = head;
  }
  get length() {
    let i = 0;
    let node = this.head;
    while (!!node) {
      i++;
      node = node.child;
    }
    return i;
  }
  // Return a new System created from the given nodes
  createFromNodes(nodes) {
    // Recursively add all nodes as children of the system
    const reversedNodes = nodes.slice().reverse();
    let newHead = null;
    for (const cur of reversedNodes) {
      newHead = cur.setChild(newHead);
    }
    // Return the new system
    return new System(newHead);
  }

  // Get the list of all nodes by increasing depth
  getNodes() {
    let nodes = [];
    let node = this.head;
    while (!!node) {
      nodes.push(node);
      node = node.child;
    }
    return nodes;
  }

  // Stringify the contents of the system into a key
  get key() {
    if (!this.head) return "";
    const notes = this.getNodes().map((node) =>
      node
        .getMap()
        .map((note) => `${note.index}+${note.offset}`)
        .join(",")
    );
    return notes.join("*");
  }
  // Return new system created from key
  static createFromKey(_key) {
    let system = new System();
    if (!_key || !_key.length) return system;

    const key = removeWhitespace(_key);
    const nodes = key.split("*");

    for (let i = 0; i < nodes.length; i++) {
      const notes = nodes[i].split(",");
      for (const note of notes) {
        if (!note) continue;
        let index, offset;
        const splitIndex = note.indexOf("+");
        if (splitIndex < 0) {
          index = note;
          offset = 0;
        } else {
          index = note.slice(0, splitIndex);
          offset = note.slice(splitIndex + 1);
        }
        index = parseInt(index);
        offset = parseInt(offset);
        system = system.addIndexAtDepth(i, index, offset);
      }
      if (i < nodes.length - 1) system = system.pushNode();
    }
    return system;
  }

  // Get the list of all nodes by decreasing depth
  getReversedNodes() {
    return this.getNodes().slice().reverse();
  }
  // Return the node at a given depth
  getNodeAtDepth(depth) {
    let i = 0;
    let node = this.head;
    while (i < depth) {
      i++;
      node = node.child;
      if (!node) break;
    }
    return node;
  }
  // Initialize a new node as a child of the highest-depth node and return the new system
  // NB: Increases depth by 1
  pushNode() {
    // If the system is empty, return a System with an empty head
    if (this.length === 0) return new System(new Coll([], []));
    // Else, create a child of the last node
    const nodes = this.getNodes();
    const lastNode = nodes.at(-1);
    const child = new Coll(lastNode.getNotes(), []);
    // Return a new System from the new nodes
    return new System().createFromNodes([...nodes, child]);
  }
  // Pop the node at the highest depth and return the new system
  // NB: Lowers depth by 1
  popNode() {
    if (!this.length) return this;
    const nodes = this.getNodes();
    return new System().createFromNodes(nodes.slice(0, -1));
  }
  getNotesAtDepth(depth) {
    const node = this.getNodeAtDepth(depth);
    if (!node) return [];
    return node?.getNotes() || [];
  }
  // Add a note to a map at a given depth and return the new system
  addIndexAtDepth(depth, index, offset = 0) {
    let nodes = this.getNodes();
    // Iterate through nodes and check if below, at, or above depth
    for (let i = 0; i < nodes.length; i++) {
      // Set the notes of the node if at the given depth
      if (i === depth) {
        const map = nodes[i].getMap();
        nodes[i] = nodes[i].setMap([...map, { index, offset: offset }]);
      }
      // Cascade and update the parent of the node's child if it exist
      if (i >= depth && i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }
    return new System().createFromNodes(nodes);
  }
  // Remove all instances of a note from the map at a given depth and return the new system
  removeNoteAtDepth(depth, note) {
    let nodes = this.getNodes();
    for (let i = 0; i < nodes.length; i++) {
      // Set the notes of the node if at the given depth
      if (i === depth) {
        nodes[i] = nodes[i].removeNote(note);
      }
      // Cascade and update the parent of the node's child if it exist
      if (i >= depth && i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }

    const reversedNodes = nodes.slice().reverse();
    let newHead = null;
    for (const cur of reversedNodes) {
      newHead = cur.setChild(newHead);
    }
    return new System(newHead);
  }
  // Remove an entry from a given index in the map at a given depth and return the new system
  removeIndexAtDepth(depth, index) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].removeNoteAtIndex(index);
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }
    return new System().createFromNodes(nodes);
  }
  // Transpose notes at a given depth by a given amount and return the new system
  TransposeNotesAtDepth(depth, amount) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].Transpose(amount);
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }
    return new System().createFromNodes(nodes);
  }
  // transpose notes at a given depth by a given amount and return the new system
  transposeNotesAtDepth(depth, amount) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].transpose(amount);
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }
    return new System().createFromNodes(nodes);
  }
  // Shuffle notes within the map at a given depth and return the new system
  shuffleNotesAtDepth(depth = 0) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].shuffleNotes();
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }
    return new System().createFromNodes(nodes);
  }
  // Randomize the notes of a map at a given depth and return the new system
  randomizeNotesAtDepth(depth = 0) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].randomizeNotes();
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }

    const reversedNodes = nodes.slice().reverse();
    let newHead = null;
    for (const cur of reversedNodes) {
      newHead = cur.setChild(newHead);
    }
    return new System(newHead);
  }
  // Reverse the notes of a map at a given depth and return the new system
  reverseNotesAtDepth(depth) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].reverseNotes();
      }
      if (i + 1 in nodes) {
        nodes[i + 1] = nodes[i + 1].setParent(nodes[i].getNotes());
      }
    }

    const reversedNodes = nodes.slice().reverse();
    let newHead = null;
    for (const cur of reversedNodes) {
      newHead = cur.setChild(newHead);
    }
    return new System(newHead);
  }
  // Clear the notes of a map at a given depth and return the new system
  clearNotesAtDepth(depth) {
    let nodes = this.getNodes();

    for (let i = 0; i < nodes.length; i++) {
      if (i < depth) continue;
      if (i === depth) {
        nodes[i] = nodes[i].clearNotes();
      }
      if (i + 1 in nodes) {
        let newNode = nodes[i + 1].setParent(nodes[i].getNotes());
        if (newNode.parent.length > 0) {
          newNode = newNode.setMap(
            newNode.map.filter((x) => x >= 0 && x <= newNode.parent.length)
          );
          nodes[i + 1] = newNode;
        } else {
          nodes[i + 1] = null;
        }
      }
    }

    const reversedNodes = nodes
      .filter((x) => !!x)
      .slice()
      .reverse();

    let newHead = null;
    for (const cur of reversedNodes) {
      newHead = cur.setChild(newHead);
    }
    return new System(newHead);
  }
}
