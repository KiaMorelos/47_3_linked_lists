/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let value of values) this.push(value);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let currentNode = this.head;
    let count = 0;

    while (currentNode !== null && count != idx) {
      // while the currenNode is  not null and the count is not EQUAL to the index
      //add 1 to the count, and move forward one node, and it becomes the current node and so on. Once we find the node at the given index, return it
      count += 1;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      // if there isn't head already, then the head and tail is new node
      this.head = newNode;
      this.tail = this.head;
    } else {
      // if there is a head already, the tail of list /next on the node is the new node
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1; // keep track of the length of our list, add 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      // if there's nothing assigned to head, assingn the newly created node
      this.head = newNode;
    } else {
      // other wise then assign the previous head to the newly create nodes .next property, and assign this.head to be the new node.
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    // if linked list has a length of 0, then the tail and the head are the same

    this.length += 1; // keep track of the length of the list, add 1
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. check if the index is valid! then use the _get method to find the value/node at the that index */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val. check if the index is valid! then use the _get method to find the to reassign the curent value of to value we just retrieved */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. check if the index is valid! */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val); // insert at the beginning
    if (idx === this.length) return this.push(val); // insert at the end

    // get the one before it
    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next; // insert before the node we specified, and update the nodes to reflect the new order.
    prev.next = newNode;

    this.length += 1; // add one the length of the list because we just inserted
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      // if the index given to remove is greater than the length of the list, or a -1 number it does not exist/is invalid.
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head; // if there's only one item in the list now it is both the head and tail
      return val;
    }

    let prev = this._get(idx - 1); // find the item before the index we're removing

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val; // get the value of the item we're removing
      prev.next = null; // there's no longer a next item
      this.tail = prev; // the tail is now what was the previous item
      this.length -= 1; // remove -1 from the list length.
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val; // get the value of the item we're removing
    prev.next = prev.next.next; // the next value is now the item that's after the item we're removing
    this.length -= 1; // update the list length
    return val;
  }

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      //while current not is not null
      total += current.val; // add up the numbers value at each node
      current = current.next;
    }

    return total / this.length; // divide the total by the list length to get the average
  }
}

module.exports = LinkedList;
