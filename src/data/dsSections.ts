import type { DsGroupId, ExerciseSection } from "./types";

export const DS_SECTIONS: ExerciseSection<DsGroupId>[] = [
  {
    "id": "stacks-queues",
    "label": "Stacks & Queues",
    "exercises": [
      {
        "id": "ds-stack",
        "type": "reorder",
        "category": "ds",
        "file": "stack.py",
        "title": "Stack (LIFO)",
        "note": "Push and pop happen on the same end — last item in is the first one out.",
        "lines": [
          "stack = []",
          "stack.append(1)",
          "stack.append(2)",
          "stack.append(3)",
          "top = stack.pop()  # 3"
        ]
      },
      {
        "id": "ds-queue",
        "type": "reorder",
        "category": "ds",
        "file": "queue.py",
        "title": "Queue (FIFO)",
        "note": "deque gives O(1) pops from the left — a list.pop(0) would be O(n).",
        "lines": [
          "from collections import deque",
          "q = deque()",
          "q.append(1)",
          "q.append(2)",
          "front = q.popleft()  # 1"
        ]
      },
      {
        "id": "ds-deque-as-stack",
        "type": "reorder",
        "category": "ds",
        "file": "deque_as_stack.py",
        "title": "Deque used as a Stack",
        "note": "deque supports append/pop from either end — it works just as well as a stack.",
        "lines": [
          "from collections import deque",
          "stack = deque()",
          "stack.append(1)",
          "stack.append(2)",
          "top = stack.pop()  # 2"
        ]
      },
      {
        "id": "ds-stack-class",
        "type": "reorder",
        "category": "ds",
        "file": "stack_class.py",
        "title": "Array-Backed Stack Class",
        "note": "Wrapping a list in a class gives you a clean push/pop API and hides the implementation.",
        "lines": [
          "class Stack:",
          "    def __init__(self):",
          "        self.items = []",
          "    def push(self, val):",
          "        self.items.append(val)",
          "    def pop(self):",
          "        return self.items.pop()"
        ]
      },
      {
        "id": "ds-circular-buffer",
        "type": "reorder",
        "category": "ds",
        "file": "circular_buffer.py",
        "title": "Circular Buffer",
        "note": "A fixed-size buffer that wraps around using modulo instead of growing forever.",
        "lines": [
          "buffer = [None] * 5",
          "idx = 0",
          "buffer[idx % 5] = 'a'",
          "idx += 1",
          "buffer[idx % 5] = 'b'",
          "idx += 1"
        ]
      },
      {
        "id": "ds-priority-queue",
        "type": "reorder",
        "category": "ds",
        "file": "priority_queue.py",
        "title": "Priority Queue (via heapq)",
        "note": "Store (priority, item) tuples — heapq orders by the first element automatically.",
        "lines": [
          "import heapq",
          "pq = []",
          "heapq.heappush(pq, (2, 'low'))",
          "heapq.heappush(pq, (1, 'high'))",
          "priority, item = heapq.heappop(pq)  # (1, 'high')"
        ],
        "interchangeable": [
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "ds-lru-cache",
        "type": "reorder",
        "category": "ds",
        "file": "lru_cache.py",
        "title": "LRU Cache (OrderedDict)",
        "note": "move_to_end() marks an item as recently used; popitem(last=False) evicts the oldest.",
        "lines": [
          "from collections import OrderedDict",
          "cache = OrderedDict()",
          "cache['a'] = 1",
          "cache.move_to_end('a')",
          "cache.popitem(last=False)"
        ]
      }
    ]
  },
  {
    "id": "lists",
    "label": "Linked Lists",
    "exercises": [
      {
        "id": "ds-linkedlist",
        "type": "reorder",
        "category": "ds",
        "file": "linked_list.py",
        "title": "Singly Linked List",
        "note": "Each node points to the next. Build a 3-node chain from a Node class.",
        "lines": [
          "class Node:",
          "    def __init__(self, val):",
          "        self.val = val",
          "        self.next = None",
          "head = Node(1)",
          "head.next = Node(2)",
          "head.next.next = Node(3)"
        ],
        "interchangeable": [
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "ds-doubly-linked-list",
        "type": "reorder",
        "category": "ds",
        "file": "doubly_linked_list.py",
        "title": "Doubly Linked List",
        "note": "Each node points both forward and backward — lets you traverse in either direction.",
        "lines": [
          "class DNode:",
          "    def __init__(self, val):",
          "        self.val = val",
          "        self.prev = None",
          "        self.next = None",
          "head = DNode(1)",
          "head.next = DNode(2)",
          "head.next.prev = head"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ]
        ]
      },
      {
        "id": "ds-linked-list-length",
        "type": "reorder",
        "category": "ds",
        "file": "linked_list_length.py",
        "title": "Linked List — Compute Length",
        "note": "No random access, so measuring length means walking every node once.",
        "lines": [
          "def length(head):",
          "    count = 0",
          "    node = head",
          "    while node:",
          "        count += 1",
          "        node = node.next",
          "    return count"
        ],
        "interchangeable": [
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "ds-dll-delete",
        "type": "reorder",
        "category": "ds",
        "file": "dll_delete.py",
        "title": "Doubly Linked List — Delete Node",
        "note": "With prev and next pointers, you can unlink a node without walking the whole list.",
        "lines": [
          "def delete_node(node):",
          "    node.prev.next = node.next",
          "    if node.next:",
          "        node.next.prev = node.prev",
          "    node.prev = None",
          "    node.next = None"
        ],
        "interchangeable": [
          [
            4,
            5
          ]
        ]
      }
    ]
  },
  {
    "id": "trees",
    "label": "Trees & Tries",
    "exercises": [
      {
        "id": "ds-tree",
        "type": "reorder",
        "category": "ds",
        "file": "binary_tree.py",
        "title": "Binary Tree Node",
        "note": "A node with left and right children — the base of every tree problem.",
        "lines": [
          "class TreeNode:",
          "    def __init__(self, val):",
          "        self.val = val",
          "        self.left = None",
          "        self.right = None",
          "root = TreeNode(5)",
          "root.left = TreeNode(3)",
          "root.right = TreeNode(8)"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ],
          [
            6,
            7
          ]
        ]
      },
      {
        "id": "ds-bst-insert",
        "type": "reorder",
        "category": "ds",
        "file": "bst_insert.py",
        "title": "Binary Search Tree — Insert",
        "note": "Smaller values go left, larger go right — recurse until you find an empty spot.",
        "lines": [
          "class BSTNode:",
          "    def __init__(self, val):",
          "        self.val = val",
          "        self.left = None",
          "        self.right = None",
          "def insert(root, val):",
          "    if root is None:",
          "        return BSTNode(val)",
          "    if val < root.val:",
          "        root.left = insert(root.left, val)",
          "    else:",
          "        root.right = insert(root.right, val)",
          "    return root"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ]
        ]
      },
      {
        "id": "ds-nary-tree",
        "type": "reorder",
        "category": "ds",
        "file": "nary_tree.py",
        "title": "N-ary Tree Node",
        "note": "Instead of just left/right, a node holds a list of any number of children.",
        "lines": [
          "class NaryNode:",
          "    def __init__(self, val):",
          "        self.val = val",
          "        self.children = []",
          "root = NaryNode(1)",
          "root.children.append(NaryNode(2))",
          "root.children.append(NaryNode(3))"
        ],
        "interchangeable": [
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "ds-trie",
        "type": "reorder",
        "category": "ds",
        "file": "trie_node.py",
        "title": "Trie Node",
        "note": "Each node holds a dict of children keyed by character, plus an end-of-word flag.",
        "lines": [
          "class TrieNode:",
          "    def __init__(self):",
          "        self.children = {}",
          "        self.is_end = False",
          "root = TrieNode()",
          "root.children['c'] = TrieNode()",
          "root.children['c'].is_end = True"
        ],
        "interchangeable": [
          [
            2,
            3
          ]
        ]
      }
    ]
  },
  {
    "id": "graphs",
    "label": "Graphs",
    "exercises": [
      {
        "id": "ds-graph",
        "type": "reorder",
        "category": "ds",
        "file": "graph.py",
        "title": "Graph (Adjacency List)",
        "note": "The most common way to represent a graph in Python: a dict of lists.",
        "lines": [
          "graph = {}",
          "graph['A'] = ['B', 'C']",
          "graph['B'] = ['D']",
          "graph['C'] = ['D']",
          "graph['D'] = []"
        ],
        "interchangeable": [
          [
            1,
            2,
            3,
            4
          ]
        ]
      },
      {
        "id": "ds-adjacency-matrix",
        "type": "reorder",
        "category": "ds",
        "file": "adjacency_matrix.py",
        "title": "Graph — Adjacency Matrix",
        "note": "An n×n grid of 0/1s — simple, but O(n²) space even for sparse graphs.",
        "lines": [
          "n = 4",
          "matrix = [[0] * n for _ in range(n)]",
          "matrix[0][1] = 1",
          "matrix[1][0] = 1"
        ],
        "interchangeable": [
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "ds-weighted-graph",
        "type": "reorder",
        "category": "ds",
        "file": "weighted_graph.py",
        "title": "Weighted Graph",
        "note": "Adjacency list where each edge is a (neighbor, weight) tuple instead of just a neighbor.",
        "lines": [
          "graph = {}",
          "graph['A'] = [('B', 4), ('C', 1)]",
          "graph['B'] = [('D', 2)]",
          "graph['C'] = [('D', 5)]"
        ],
        "interchangeable": [
          [
            1,
            2,
            3
          ]
        ]
      },
      {
        "id": "ds-edge-set",
        "type": "reorder",
        "category": "ds",
        "file": "edge_set.py",
        "title": "Graph as a Set of Edges",
        "note": "For sparse graphs where you only need 'is this edge present', a set of tuples works well.",
        "lines": [
          "edges = set()",
          "edges.add(('A', 'B'))",
          "edges.add(('B', 'C'))",
          "connected = ('A', 'B') in edges  # True"
        ],
        "interchangeable": [
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "ds-union-find",
        "type": "reorder",
        "category": "ds",
        "file": "union_find.py",
        "title": "Union-Find (Disjoint Set)",
        "note": "Each element starts as its own parent; union() merges two sets by parent pointer.",
        "lines": [
          "parent = list(range(5))",
          "def find(x):",
          "    while parent[x] != x:",
          "        x = parent[x]",
          "    return x",
          "parent[find(1)] = find(2)"
        ]
      }
    ]
  },
  {
    "id": "heaps",
    "label": "Heaps",
    "exercises": [
      {
        "id": "ds-heap",
        "type": "reorder",
        "category": "ds",
        "file": "min_heap.py",
        "title": "Min-Heap",
        "note": "heapq keeps the smallest element at index 0 at all times.",
        "lines": [
          "import heapq",
          "heap = []",
          "heapq.heappush(heap, 5)",
          "heapq.heappush(heap, 1)",
          "heapq.heappush(heap, 3)",
          "smallest = heapq.heappop(heap)  # 1"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ]
        ]
      },
      {
        "id": "ds-max-heap",
        "type": "reorder",
        "category": "ds",
        "file": "max_heap.py",
        "title": "Max-Heap (via negation)",
        "note": "heapq is min-heap only — negate values on the way in and out to simulate a max-heap.",
        "lines": [
          "import heapq",
          "max_heap = []",
          "heapq.heappush(max_heap, -5)",
          "heapq.heappush(max_heap, -1)",
          "heapq.heappush(max_heap, -3)",
          "largest = -heapq.heappop(max_heap)  # 5"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ]
        ]
      }
    ]
  },
  {
    "id": "hash-maps",
    "label": "Hash Maps & Sets",
    "exercises": [
      {
        "id": "ds-set",
        "type": "reorder",
        "category": "ds",
        "file": "hash_set.py",
        "title": "Hash Set (dedup / lookup)",
        "note": "O(1) average membership checks — the backbone of most \"seen before\" logic.",
        "lines": [
          "seen = set()",
          "seen.add(1)",
          "seen.add(2)",
          "exists = 2 in seen  # True"
        ],
        "interchangeable": [
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "ds-defaultdict-groups",
        "type": "reorder",
        "category": "ds",
        "file": "defaultdict_groups.py",
        "title": "Grouping with defaultdict",
        "note": "defaultdict(list) means you never have to check 'if key not in dict' before appending.",
        "lines": [
          "from collections import defaultdict",
          "groups = defaultdict(list)",
          "groups['a'].append(1)",
          "groups['a'].append(2)",
          "groups['b'].append(3)"
        ]
      },
      {
        "id": "ds-counter-multiset",
        "type": "reorder",
        "category": "ds",
        "file": "counter_multiset.py",
        "title": "Counter as a Multiset",
        "note": "Counter is a dict that defaults missing keys to 0 — perfect for tallying occurrences.",
        "lines": [
          "from collections import Counter",
          "bag = Counter()",
          "bag['apple'] += 1",
          "bag['apple'] += 1",
          "bag['banana'] += 1"
        ],
        "interchangeable": [
          [
            2,
            3,
            4
          ]
        ]
      },
      {
        "id": "ds-sparse-map",
        "type": "reorder",
        "category": "ds",
        "file": "sparse_map.py",
        "title": "Sparse Array (dict-backed)",
        "note": "For mostly-empty grids, a dict keyed by (row, col) beats a giant 2D list.",
        "lines": [
          "sparse = {}",
          "sparse[(0, 0)] = 5",
          "sparse[(3, 7)] = 2",
          "value = sparse.get((1, 1), 0)  # 0"
        ],
        "interchangeable": [
          [
            1,
            2,
            3
          ]
        ]
      }
    ]
  },
  {
    "id": "arrays",
    "label": "Arrays & Matrices",
    "exercises": [
      {
        "id": "ds-2d-matrix",
        "type": "reorder",
        "category": "ds",
        "file": "matrix_2d.py",
        "title": "2D Matrix (list of lists)",
        "note": "Build rows with a comprehension — never multiply a list of lists directly.",
        "lines": [
          "rows, cols = 3, 3",
          "matrix = [[0] * cols for _ in range(rows)]",
          "matrix[1][2] = 9",
          "value = matrix[1][2]  # 9"
        ]
      }
    ]
  }
];
