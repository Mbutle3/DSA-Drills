import type { CheatSheetSection } from "./types";

export const CHEAT_SHEET_SECTIONS: CheatSheetSection[] = [
  // ── Data Structures ──────────────────────────────────────────────
  {
    id: "stacks-queues",
    label: "Stacks & Queues",
    category: "ds",
    groupMnemonic: "Stack = plate pile (LIFO). Queue = coffee line (FIFO).",
    entries: [
      {
        title: "Stack (LIFO)",
        when: "Undo/redo, DFS, parsing brackets, monotonic stack problems.",
        mnemonic: "Last In, First Out — push and pop the same end.",
        points: [
          "Python: list with append() + pop()",
          "O(1) push/pop at the end",
          "Think: nesting, backtracking, \"most recent first\"",
        ],
        snippet: "stack.append(x); top = stack.pop()",
      },
      {
        title: "Queue (FIFO)",
        when: "BFS, scheduling, buffering, level-order traversal.",
        mnemonic: "First In, First Out — enqueue back, dequeue front.",
        points: [
          "Use collections.deque — never list.pop(0) (O(n))",
          "popleft() is O(1) on a deque",
          "BFS always starts with a queue",
        ],
        snippet: "q = deque(); q.append(x); front = q.popleft()",
      },
      {
        title: "Priority Queue",
        when: "Dijkstra, merge k sorted lists, \"always process smallest next.\"",
        mnemonic: "Heapq sorts tuples — smallest first element wins.",
        points: [
          "Store (priority, item) pairs",
          "heappush / heappop keep the min at index 0",
          "For max-heap: negate values on push and pop",
        ],
        snippet: "heapq.heappush(pq, (dist, node))",
      },
      {
        title: "LRU Cache",
        when: "Evict least-recently-used item when capacity is full.",
        mnemonic: "Touch it? Move to end. Full? Pop from front.",
        points: [
          "OrderedDict tracks insertion order",
          "move_to_end(key) on access",
          "popitem(last=False) evicts oldest",
        ],
      },
      {
        title: "Circular Buffer",
        when: "Fixed-size streaming buffer (audio, logs, ring queue).",
        mnemonic: "Index wraps with modulo — no reallocation.",
        points: ["idx % capacity points to the next slot", "Separate read/write pointers in production code"],
      },
    ],
  },
  {
    id: "lists",
    label: "Linked Lists",
    category: "ds",
    groupMnemonic: "No random access — walk the chain. Dummy head saves edge cases.",
    entries: [
      {
        title: "Singly Linked List",
        when: "Dynamic size, frequent inserts/deletes at known positions.",
        mnemonic: "Node + .next — the chain IS the structure.",
        points: [
          "O(n) lookup — must walk from head",
          "O(1) insert after a known node",
          "Always draw pointers before you rewrite them",
        ],
      },
      {
        title: "Doubly Linked List",
        when: "Need backward traversal or O(1) delete given a node reference.",
        mnemonic: "Prev + next — unlink without scanning from head.",
        points: [
          "node.prev.next = node.next (and mirror for prev)",
          "Used in LRU caches, browser history",
        ],
      },
      {
        title: "Reverse a Linked List",
        when: "Classic interview pattern — in-place pointer flip.",
        mnemonic: "Three pointers: prev, curr, next — flip one link at a time.",
        points: [
          "Save next before overwriting curr.next",
          "prev starts as None, curr as head",
          "O(n) time, O(1) space",
        ],
      },
      {
        title: "Floyd's Cycle Detection",
        when: "Detect a cycle or find the cycle start in a linked list.",
        mnemonic: "Tortoise and hare — if they meet, there's a loop.",
        points: [
          "Slow moves 1 step, fast moves 2",
          "Meeting inside the cycle → reset one to head to find entry",
          "Also works for \"happy number\" style problems",
        ],
      },
    ],
  },
  {
    id: "trees",
    label: "Trees & Tries",
    category: "ds",
    groupMnemonic: "Trees branch. BST: left smaller, right larger. Trie: spell letter by letter.",
    entries: [
      {
        title: "Binary Tree",
        when: "Hierarchical data — files, DOM, decision trees, BST problems.",
        mnemonic: "Every node has at most left and right.",
        points: [
          "Traversals: inorder (sorted BST), preorder (copy), postorder (delete)",
          "Height/recursion: base case = null node",
        ],
      },
      {
        title: "Binary Search Tree",
        when: "Sorted insert/search in average O(log n) when balanced.",
        mnemonic: "Go left if smaller, right if larger — recurse to empty spot.",
        points: [
          "Inorder traversal prints sorted values",
          "Worst case O(n) if skewed — AVL/red-black fix that",
        ],
      },
      {
        title: "Trie (Prefix Tree)",
        when: "Autocomplete, spell-check, prefix search, word dictionary.",
        mnemonic: "Each level is a character — children dict + end-of-word flag.",
        points: [
          "O(m) insert/search where m = word length",
          "Space-heavy but prefix queries are fast",
          "Shared prefixes stored once",
        ],
      },
      {
        title: "N-ary Tree",
        when: "File systems, org charts, any node with many children.",
        mnemonic: "children = list — same DFS/BFS ideas, loop all kids.",
        points: ["BFS still uses a queue", "DFS: for child in node.children: recurse"],
      },
    ],
  },
  {
    id: "graphs",
    label: "Graphs",
    category: "ds",
    groupMnemonic: "Adj list for sparse graphs. BFS = queue (levels). DFS = stack/recursion (deep).",
    entries: [
      {
        title: "Adjacency List",
        when: "Default graph representation — sparse, easy to iterate neighbors.",
        mnemonic: "Dict of node → list of neighbors.",
        points: [
          "O(V + E) space for sparse graphs",
          "Easy BFS/DFS — loop graph[node]",
          "Add undirected edges in both directions",
        ],
        snippet: "graph = {0: [1, 2], 1: [0]}",
      },
      {
        title: "Adjacency Matrix",
        when: "Dense graphs, need O(1) edge lookup, small fixed V.",
        mnemonic: "grid[i][j] = 1 if edge exists — O(V²) space.",
        points: ["Fast edge check", "Slow to iterate neighbors", "Good when V ≤ a few hundred"],
      },
      {
        title: "Weighted Graph",
        when: "Shortest path, network cost, Dijkstra problems.",
        mnemonic: "Neighbors are (node, weight) tuples — not just ints.",
        points: ["Dijkstra needs non-negative weights", "Bellman-Ford handles negatives"],
      },
      {
        title: "Union-Find (Disjoint Set)",
        when: "Connected components, Kruskal's MST, \"are A and B in the same group?\"",
        mnemonic: "Find the root parent — union merges two trees.",
        points: [
          "Path compression during find() flattens the tree",
          "Union by rank/size keeps trees shallow",
          "Nearly O(1) amortized per operation",
        ],
      },
    ],
  },
  {
    id: "heaps",
    label: "Heaps",
    category: "ds",
    groupMnemonic: "Python heapq = min-heap only. Want max? Negate it.",
    entries: [
      {
        title: "Min-Heap",
        when: "K smallest, streaming median, Dijkstra, priority scheduling.",
        mnemonic: "Smallest item always lives at index 0.",
        points: [
          "heapify in O(n), heappush/pop in O(log n)",
          "nlargest / nsmallest for top-k without full sort",
        ],
        snippet: "import heapq; heapq.heappush(h, x); mn = h[0]",
      },
      {
        title: "Max-Heap (negation trick)",
        when: "Need the largest element repeatedly in Python.",
        mnemonic: "Push -x, pop and negate back.",
        points: [
          "heappush(h, -val) / -heappop(h)",
          "Same heapq module — no separate max-heap",
        ],
      },
    ],
  },
  {
    id: "hash-maps",
    label: "Hash Maps & Sets",
    category: "ds",
    groupMnemonic: "Set = \"seen it?\" Dict = \"what goes with this key?\" Counter = \"how many?\"",
    entries: [
      {
        title: "Hash Set",
        when: "Duplicate detection, membership, two-sum complement lookup.",
        mnemonic: "O(1) average add and lookup — your \"seen before\" tool.",
        points: ["if x in seen: ...", "seen.add(x) as you scan"],
      },
      {
        title: "defaultdict",
        when: "Grouping items by key without if-key-not-in-dict boilerplate.",
        mnemonic: "Missing keys auto-create — list, int, or set factory.",
        points: [
          "defaultdict(list) for adjacency-style grouping",
          "defaultdict(int) for counting without .get()",
        ],
      },
      {
        title: "Counter",
        when: "Frequency maps, anagrams, top-k frequent elements.",
        mnemonic: "Dict that returns 0 for missing keys — count everything.",
        points: [
          "Counter(nums) in one line",
          "most_common(k) for top frequencies",
          "Counter subtraction for multiset diff",
        ],
      },
      {
        title: "Sparse Array",
        when: "Huge grid, mostly empty cells — don't allocate the whole matrix.",
        mnemonic: "Dict keyed by (row, col) — only store what's set.",
        points: ["Saves memory on sparse grids", "Same idea as hash map of coordinates"],
      },
    ],
  },
  {
    id: "arrays",
    label: "Arrays & Matrices",
    category: "ds",
    groupMnemonic: "Never [[0]*cols]*rows — each row needs its own list.",
    entries: [
      {
        title: "2D Matrix",
        when: "Grids, images, DP tables, board games.",
        mnemonic: "List comprehension per row — independent inner lists.",
        points: [
          "[[0]*cols for _ in range(rows)] ✓",
          "[[0]*cols]*rows ✗ (aliased rows!)",
          "Index as matrix[r][c] or grid[row][col]",
        ],
        snippet: "matrix = [[0] * cols for _ in range(rows)]",
      },
    ],
  },

  // ── Algorithms ───────────────────────────────────────────────────
  {
    id: "sorting",
    label: "Sorting",
    category: "algo",
    groupMnemonic: "O(n²) for tiny n or nearly sorted. O(n log n) for general purpose.",
    entries: [
      {
        title: "Comparison Sorts",
        when: "Need ordered output — know tradeoffs by size and stability.",
        mnemonic: "Bubble/insertion/selection = O(n²). Merge/quick = O(n log n).",
        points: [
          "Insertion sort: great for small or mostly sorted arrays",
          "Merge sort: stable, guaranteed O(n log n)",
          "Quicksort: fast average, pick pivot carefully",
        ],
      },
      {
        title: "When to use built-in sort",
        when: "Python interviews — sorted() or .sort() is almost always fine.",
        mnemonic: "Timsort is O(n log n) and highly optimized — don't reinvent unless asked.",
        points: ["key= for custom ordering", "sorted(arr, key=lambda x: x[1])"],
      },
    ],
  },
  {
    id: "divide-and-conquer",
    label: "Divide & Conquer",
    category: "algo",
    groupMnemonic: "Split → solve halves → combine. Binary search is DC on a sorted array.",
    entries: [
      {
        title: "Merge Sort",
        when: "Stable O(n log n) sort, counting inversions.",
        mnemonic: "Split in half, sort each, merge two sorted lists.",
        points: ["Merge step is O(n)", "Extra O(n) space for the merge buffer"],
      },
      {
        title: "Quicksort",
        when: "In-place O(n log n) average sort.",
        mnemonic: "Pivot partitions smaller left, larger right — recurse both sides.",
        points: ["Lomuto: pivot at end, scan and swap", "Worst O(n²) if pivot always min/max"],
      },
      {
        title: "Quickselect",
        when: "Kth smallest/largest without full sort.",
        mnemonic: "Partition like quicksort — recurse only the side containing k.",
        points: ["Average O(n), worst O(n²)", "Random pivot helps expected performance"],
      },
      {
        title: "Binary Search",
        when: "Sorted array, \"find boundary,\" minimize/maximize answer space.",
        mnemonic: "Halve the search space — lo, mid, hi until lo > hi.",
        points: [
          "O(log n) — requires monotonic predicate",
          "First/last occurrence: don't stop at first match, keep narrowing",
          "Works on answer space too, not just arrays",
        ],
        snippet: "while lo <= hi: mid = (lo + hi) // 2",
      },
    ],
  },
  {
    id: "graph-traversal",
    label: "Graph Traversal & Shortest Path",
    category: "algo",
    groupMnemonic: "BFS = shortest unweighted path. Dijkstra = weighted. DFS = explore all paths.",
    entries: [
      {
        title: "BFS",
        when: "Shortest path in unweighted graph, level-order, min steps.",
        mnemonic: "Queue + visited — process layer by layer.",
        points: [
          "First time you reach a node = shortest path (unweighted)",
          "Mark visited when enqueuing, not when dequeuing",
        ],
      },
      {
        title: "DFS",
        when: "Explore all paths, connected components, cycle detection, topo via postorder.",
        mnemonic: "Go deep first — recursion or explicit stack.",
        points: [
          "Natural for backtracking",
          "Iterative DFS: push neighbors on a stack",
          "Watch stack depth on huge graphs",
        ],
      },
      {
        title: "Dijkstra",
        when: "Single-source shortest path with non-negative edge weights.",
        mnemonic: "Greedy: always expand the closest unvisited node via min-heap.",
        points: [
          "Priority queue of (distance, node)",
          "Skip stale entries if dist > best known",
          "Does NOT work with negative edges",
        ],
      },
      {
        title: "Topological Sort",
        when: "Task ordering with prerequisites, course schedule, build order.",
        mnemonic: "Kahn's: peel nodes with zero in-degree, repeat.",
        points: [
          "Only works on DAGs — cycle = no valid order",
          "BFS on in-degree count, or DFS postorder reverse",
        ],
      },
      {
        title: "Flood Fill (Islands)",
        when: "Connected regions on a grid — count or mark components.",
        mnemonic: "DFS/BFS from each unvisited '1' — sink cells as you go.",
        points: ["Mark visited by mutating grid or using a set", "4-direction or 8-direction neighbors"],
      },
    ],
  },
  {
    id: "dynamic-programming",
    label: "Dynamic Programming",
    category: "algo",
    groupMnemonic: "Optimal substructure + overlapping subproblems → table or memo.",
    entries: [
      {
        title: "When to reach for DP",
        when: "Count/optimize over choices, recursive solution repeats same states.",
        mnemonic: "Ask: can I define dp[i] (or dp[i][j]) from smaller indices?",
        points: [
          "Top-down: memoize recursion",
          "Bottom-up: fill table in dependency order",
          "State = what you need to remember (index, capacity, last choice)",
        ],
      },
      {
        title: "1D DP",
        when: "Fibonacci, climbing stairs, house robber, max subarray.",
        mnemonic: "dp[i] = best answer using first i elements.",
        points: ["Kadane: running max ending here vs global best", "Fibonacci: memo turns O(2ⁿ) → O(n)"],
      },
      {
        title: "2D DP",
        when: "Two sequences (LCS), knapsack, edit distance, grid paths.",
        mnemonic: "dp[i][j] = answer for prefix A[:i] and B[:j].",
        points: [
          "Knapsack: include item or skip — max of both",
          "Edit distance: insert, delete, substitute — min of three",
          "Often O(n·m) time and space; can sometimes roll to 1D",
        ],
      },
      {
        title: "Kadane's Algorithm",
        when: "Maximum sum contiguous subarray.",
        mnemonic: "Current sum resets when it goes negative — track global max.",
        points: ["O(n) one pass", "cur = max(x, cur + x); best = max(best, cur)"],
      },
    ],
  },
  {
    id: "two-pointers",
    label: "Two Pointers",
    category: "algo",
    groupMnemonic: "Sorted array + pair sum? Left and right walk toward each other.",
    entries: [
      {
        title: "Opposite Ends",
        when: "Pair sum, pair difference, container with most water on sorted data.",
        mnemonic: "Too small? move left right. Too big? move right left.",
        points: ["Requires sorted input (or sort first)", "O(n) after sort"],
      },
      {
        title: "Same Direction (Fast/Slow)",
        when: "In-place removal, partition, cycle detection.",
        mnemonic: "Read pointer scans, write pointer commits valid elements.",
        points: ["Remove duplicates in-place", "Partition array around pivot"],
      },
      {
        title: "Merge Two Sorted Lists",
        when: "Combine two sorted linked lists or arrays.",
        mnemonic: "Dummy head — attach smaller node, advance that list.",
        points: ["Avoids special-casing the first node", "Tail pointer walks the result"],
      },
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    category: "algo",
    groupMnemonic: "Fixed size? Add right, drop left. Variable size? Expand until invalid, then shrink.",
    entries: [
      {
        title: "Fixed-Size Window",
        when: "Max/min sum of subarray of length k, averages over k elements.",
        mnemonic: "Window sum = previous sum − outgoing + incoming.",
        points: ["O(n) — each element enters and leaves once", "Precompute first window, then slide"],
      },
      {
        title: "Variable-Size Window",
        when: "Longest substring without repeats, minimum window substring.",
        mnemonic: "Expand right until constraint breaks, shrink left until valid again.",
        points: [
          "Hash map counts chars in window",
          "Track best while window is valid",
        ],
      },
    ],
  },
  {
    id: "hash-map",
    label: "Hash Map Patterns",
    category: "algo",
    groupMnemonic: "Trade space for time — one pass with a complement map.",
    entries: [
      {
        title: "Two Sum",
        when: "Find pair with target sum, or complement exists.",
        mnemonic: "For each x, check if (target − x) is already in the map.",
        points: [
          "One pass: store value → index",
          "O(n) time, O(n) space",
          "Generalizes to subarray sum with prefix sums + hash map",
        ],
        snippet: "if target - x in seen: return ...; seen[x] = i",
      },
      {
        title: "Frequency / Anagram Maps",
        when: "Anagrams, permutations with same counts, ransom note.",
        mnemonic: "Same frequency map = same multiset of characters.",
        points: ["Counter(s) == Counter(t)", "Fixed alphabet: array of 26 counts"],
      },
    ],
  },
  {
    id: "backtracking",
    label: "Backtracking",
    category: "algo",
    groupMnemonic: "Choose → explore → undo. Every decision is a branch you can reverse.",
    entries: [
      {
        title: "Backtracking Template",
        when: "Generate all permutations/subsets/combinations, N-Queens, Sudoku.",
        mnemonic: "Push choice, recurse, pop choice — the \"undo\" is mandatory.",
        points: [
          "Base case: valid complete answer → record it",
          "Prune early when partial state can't succeed",
          "path.copy() when saving results (lists are mutable)",
        ],
      },
      {
        title: "Permutations vs Combinations",
        when: "Order matters vs order doesn't.",
        mnemonic: "Permutations: pick any remaining. Combinations: pick from index i onward only.",
        points: [
          "itertools.permutations / combinations for reference",
          "Subsets = 2ⁿ include/exclude decisions",
        ],
      },
      {
        title: "N-Queens Constraint Check",
        when: "Placing queens so none attack each other.",
        mnemonic: "Same column or same diagonal = invalid. Diagonal: |row diff| == |col diff|.",
        points: ["Track columns and diagonals with sets for O(1) checks"],
      },
    ],
  },
  {
    id: "linked-list",
    label: "Linked List Techniques",
    category: "algo",
    groupMnemonic: "Dummy node + three pointers solve most list problems.",
    entries: [
      {
        title: "Reverse Linked List",
        when: "In-place reversal — iterative or recursive.",
        mnemonic: "prev, curr, next — flip curr.next to prev, walk forward.",
        points: ["O(n) time, O(1) space iterative"],
      },
      {
        title: "Merge Two Sorted Lists",
        when: "Combine two sorted chains into one.",
        mnemonic: "Dummy head, attach smaller, advance one pointer.",
        points: ["Don't forget the remaining tail when one list ends"],
      },
    ],
  },
  {
    id: "stack-queue",
    label: "Stack & Queue (Algorithms)",
    category: "algo",
    groupMnemonic: "Stack = matching/nesting. Queue = process in arrival order.",
    entries: [
      {
        title: "Valid Parentheses",
        when: "Balanced brackets, HTML tag matching, nested structure validation.",
        mnemonic: "Open → push. Close → must match stack top. End empty = valid.",
        points: [
          "Map closing → opening char",
          "Stack empty on close = invalid",
        ],
      },
      {
        title: "Monotonic Stack",
        when: "Next greater element, daily temperatures, histogram area.",
        mnemonic: "Stack stays sorted — pop smaller items when a bigger one arrives.",
        points: ["Each element pushed/popped once → O(n)", "Store indices or values as needed"],
      },
    ],
  },
  {
    id: "math",
    label: "Math & Number Theory",
    category: "algo",
    groupMnemonic: "Modulo and GCD show up everywhere — know the builtins.",
    entries: [
      {
        title: "Euclidean GCD",
        when: "Common divisor, fraction reduction, cycle period problems.",
        mnemonic: "gcd(a, b) = gcd(b, a % b) until b is 0.",
        points: ["math.gcd(a, b) in Python", "O(log min(a, b))"],
      },
      {
        title: "Sieve of Eratosthenes",
        when: "All primes up to n, counting primes in range.",
        mnemonic: "Cross off multiples starting at p² — survivors are prime.",
        points: ["O(n log log n)", "Only sieve up to √n for inner loop start"],
      },
    ],
  },
  {
    id: "arrays-matrices",
    label: "Arrays & Matrices (Algorithms)",
    category: "algo",
    groupMnemonic: "Rotate = reverse segments. Spiral = peel layers.",
    entries: [
      {
        title: "Rotate Array",
        when: "Circular shift left/right by k positions.",
        mnemonic: "Reverse whole array, reverse first k, reverse rest — three reverses.",
        points: ["O(n) in-place", "k %= n to handle k > len"],
      },
      {
        title: "Spiral Matrix",
        when: "Traverse matrix in spiral order.",
        mnemonic: "Peel top row → rotate remainder → repeat until empty.",
        points: ["Track top/bottom/left/right bounds and shrink", "Or simulate direction + turns"],
      },
    ],
  },
  {
    id: "tries-union-find",
    label: "Tries & Union-Find",
    category: "algo",
    groupMnemonic: "Trie for words. Union-Find for connectivity.",
    entries: [
      {
        title: "Trie Insert",
        when: "Build a searchable dictionary of strings.",
        mnemonic: "Walk/create child per character — mark is_end at the last letter.",
        points: ["Shared prefixes = shared path", "Search follows exact char path"],
      },
      {
        title: "Union-Find with Path Compression",
        when: "Dynamic connectivity, counting components online.",
        mnemonic: "find(x) points every node along the path directly to root.",
        points: [
          "Combine with union by rank",
          "Nearly constant time per operation amortized",
        ],
      },
    ],
  },

  // ── Python One-Liners ────────────────────────────────────────────
  {
    id: "comprehensions",
    label: "Comprehensions",
    category: "oneliner",
    groupMnemonic: "[expr for x in iterable if cond] — filter and map in one readable line.",
    entries: [
      {
        title: "List Comprehension",
        when: "Transform/filter a list in one expression.",
        mnemonic: "Read left-to-right: output, loop, optional filter.",
        points: [
          "[x**2 for x in nums if x % 2 == 0]",
          "Nested: [item for sub in nested for item in sub]",
          "Prefer over map/filter when readable",
        ],
      },
      {
        title: "Generator Expression",
        when: "Lazy iteration — sum, any, max without building a full list.",
        mnemonic: "Parentheses instead of brackets — one item at a time.",
        points: ["sum(x**2 for x in nums)", "Memory-efficient for large data"],
      },
      {
        title: "2D Matrix Creation",
        when: "Initialize a rows × cols grid.",
        mnemonic: "New list per row — never multiply a row list.",
        points: ["[[0]*cols for _ in range(rows)]"],
      },
    ],
  },
  {
    id: "counting",
    label: "Frequency & Counting",
    category: "oneliner",
    groupMnemonic: "Counter(nums) first. most_common(k) for top hits.",
    entries: [
      {
        title: "Counter",
        when: "Frequency map in one line.",
        mnemonic: "from collections import Counter — then Counter(iterable).",
        points: [
          "freq.most_common(1)[0][0] → mode",
          "Counter(a) - Counter(b) for multiset diff",
        ],
        snippet: "freq = Counter(nums)",
      },
      {
        title: "Dict Comprehension Count",
        when: "Count without imports.",
        mnemonic: "{x: nums.count(x) for x in set(nums)}",
        points: ["set() avoids duplicate keys", "O(n²) — use Counter for big n"],
      },
      {
        title: "defaultdict Counter",
        when: "Manual increment loop without KeyError.",
        mnemonic: "defaultdict(int) — freq[x] += 1 always works.",
        points: ["No if x not in freq check"],
      },
    ],
  },
  {
    id: "dicts-sets",
    label: "Dicts & Sets",
    category: "oneliner",
    groupMnemonic: "zip → dict. | merges dicts (Py 3.9+). Sets use & | - ^.",
    entries: [
      {
        title: "Zip to Dict",
        when: "Pair parallel lists into key-value mapping.",
        mnemonic: "dict(zip(keys, values))",
        points: ["Lengths must match", "Keys must be hashable"],
      },
      {
        title: "Sort Dict by Value",
        when: "Rank items by count or score.",
        mnemonic: "sorted(d.items(), key=lambda kv: kv[1], reverse=True)",
        points: ["Returns list of tuples", ".items() gives (key, value) pairs"],
      },
      {
        title: "Set Operations",
        when: "Union, intersection, unique-to-one-side.",
        mnemonic: "a | b union, a & b intersection, a ^ b symmetric diff.",
        points: ["Sets auto-dedupe", "List intersection: set(a) & set(b)"],
      },
    ],
  },
  {
    id: "strings",
    label: "Strings",
    category: "oneliner",
    groupMnemonic: "s[::-1] reverses. join/split bridge str ↔ list. Counter for anagrams.",
    entries: [
      {
        title: "Reverse & Palindrome",
        when: "Check or produce reversed text.",
        mnemonic: "s[::-1] — step −1 walks backward.",
        points: ["Palindrome: s == s[::-1]", "Case-sensitive unless you .lower()"],
      },
      {
        title: "Split, Strip, Join",
        when: "Parse CSV-like lines or rebuild strings.",
        mnemonic: "split → clean each part → join.",
        points: ["[p.strip() for p in line.split(',')]", "\"\".join(chars)"],
      },
      {
        title: "Anagram Check",
        when: "Same letters, different order.",
        mnemonic: "Counter(a) == Counter(b) — same frequency map.",
        points: ["Sort compare works too: sorted(a) == sorted(b)"],
      },
      {
        title: "f-strings",
        when: "Format output with variables inline.",
        mnemonic: "f\"{name}: {score:.2f}\" — format spec inside braces.",
        points: [":.2f two decimals", ":>10 right-align width 10"],
      },
    ],
  },
  {
    id: "lists",
    label: "Lists & Sequences",
    category: "oneliner",
    groupMnemonic: "enumerate for index+value. zip(*pairs) unzips. slice [::2] every other.",
    entries: [
      {
        title: "enumerate & max with key",
        when: "Need index of max element.",
        mnemonic: "max(enumerate(nums), key=lambda x: x[1]) → (idx, val).",
        points: ["x[0] is index, x[1] is value in the lambda"],
      },
      {
        title: "Dedupe Preserving Order",
        when: "Unique elements, first occurrence wins.",
        mnemonic: "list(dict.fromkeys(nums)) — dict keys stay insertion-ordered.",
        points: ["Set alone loses order"],
      },
      {
        title: "Chunk a List",
        when: "Fixed-size batches.",
        mnemonic: "[nums[i:i+size] for i in range(0, len(nums), size)]",
        points: ["range step = chunk size"],
      },
      {
        title: "Unzip Pairs",
        when: "Separate list of tuples into two lists.",
        mnemonic: "names, ages = zip(*pairs) — star unpacks rows into columns.",
        points: ["Returns tuples — wrap in list() if needed"],
      },
    ],
  },
  {
    id: "itertools-functools",
    label: "itertools & functools",
    category: "oneliner",
    groupMnemonic: "itertools = lazy combos. functools.reduce = fold left.",
    entries: [
      {
        title: "combinations / permutations",
        when: "All pairs or orderings without nested loops.",
        mnemonic: "combinations(nums, 2) — order doesn't matter. permutations — order matters.",
        points: ["Returns iterator — wrap in list() to materialize"],
      },
      {
        title: "groupby",
        when: "Consecutive runs of equal keys (sort first for full grouping!).",
        mnemonic: "itertools.groupby(sorted(items)) — data must be sorted by key.",
        points: ["Often: groupby(items, key=lambda x: x[0])"],
      },
      {
        title: "map, filter, reduce",
        when: "Functional transforms on iterables.",
        mnemonic: "map(fn, it), filter(pred, it), reduce(fn, it, init).",
        points: [
          "list(map(lambda x: x*2, filter(lambda x: x%2==0, nums)))",
          "reduce needs: from functools import reduce",
        ],
      },
      {
        title: "chain.from_iterable",
        when: "Flatten one level of nesting.",
        mnemonic: "list(chain.from_iterable(nested))",
        points: ["Cleaner than nested comprehension for some cases"],
      },
    ],
  },
  {
    id: "matrices",
    label: "Matrices",
    category: "oneliner",
    groupMnemonic: "zip(*matrix) transposes. sum(row) nested sums the grid.",
    entries: [
      {
        title: "Transpose",
        when: "Swap rows and columns.",
        mnemonic: "list(zip(*matrix)) — star unpacks rows as columns.",
        points: ["Rows must be equal length", "Wrap in list() — zip returns tuples"],
      },
      {
        title: "Sum Nested Grid",
        when: "Total of all cells.",
        mnemonic: "sum(sum(row) for row in matrix)",
        points: ["Inner sum per row, outer sum across rows"],
      },
    ],
  },
  {
    id: "heapq",
    label: "heapq",
    category: "oneliner",
    groupMnemonic: "heapq.nlargest(k, nums) — faster than sorting when k is small.",
    entries: [
      {
        title: "nlargest / nsmallest",
        when: "Top k or bottom k elements.",
        mnemonic: "heapq.nlargest(3, nums) — O(n log k).",
        points: [
          "Better than sorted(nums)[-k:] for small k on large n",
          "Works with key= like sorted",
        ],
      },
    ],
  },
  {
    id: "python-idioms",
    label: "Python Idioms",
    category: "oneliner",
    groupMnemonic: "a, b = b, a swaps. walrus := assigns in expressions. math/is/builtins for numbers.",
    entries: [
      {
        title: "Swap & Ternary",
        when: "Exchange variables or inline if/else.",
        mnemonic: "a, b = b, a — tuple unpack. x if cond else y — ternary.",
        points: ["No temp variable needed for swap"],
      },
      {
        title: "Walrus Operator",
        when: "Use a value and assign it in the same expression.",
        mnemonic: "if (n := len(data)) > 10: — assign inside the condition.",
        points: ["Avoids calling len(data) twice", "Python 3.8+"],
      },
      {
        title: "Chained Comparison",
        when: "Range checks read naturally.",
        mnemonic: "1 <= x <= 100 — same as x >= 1 and x <= 100.",
        points: ["Python evaluates once per middle term"],
      },
      {
        title: "Number Tricks",
        when: "Digits, binary, sqrt, gcd without rolling your own.",
        mnemonic: "str(n) for digits, bin(n)[2:] for binary, math.isqrt(n), math.gcd(a,b).",
        points: [
          "sum(int(d) for d in str(n)) digit sum",
          "ord(ch) for ASCII code point",
        ],
      },
    ],
  },
];

export const CHEAT_SHEET_PATTERN_PICKER = [
  {
    signal: "Sorted array + pair / triple sum",
    pattern: "Two pointers (opposite ends) or binary search",
  },
  {
    signal: "Subarray with sum / count condition",
    pattern: "Prefix sum + hash map, or sliding window if non-negative",
  },
  {
    signal: "Shortest path, unweighted graph",
    pattern: "BFS with a queue",
  },
  {
    signal: "Shortest path, weighted (non-negative)",
    pattern: "Dijkstra + min-heap",
  },
  {
    signal: "All combinations / permutations",
    pattern: "Backtracking — choose, recurse, undo",
  },
  {
    signal: "Overlapping subproblems + optimal substructure",
    pattern: "Dynamic programming — memo or tabulation",
  },
  {
    signal: "Next greater / smaller element",
    pattern: "Monotonic stack",
  },
  {
    signal: "Connected components / same group?",
    pattern: "Union-Find or DFS/BFS flood fill",
  },
  {
    signal: "Prefix / dictionary of words",
    pattern: "Trie",
  },
  {
    signal: "Top K frequent / largest",
    pattern: "Counter + heapq, or heapq.nlargest",
  },
  {
    signal: "Need O(1) lookup or dedupe",
    pattern: "Hash set or hash map",
  },
  {
    signal: "Nested brackets / undo",
    pattern: "Stack",
  },
  {
    signal: "Level-by-level / min steps",
    pattern: "Queue (BFS)",
  },
  {
    signal: "Count occurrences in Python",
    pattern: "Counter(nums) or defaultdict(int)",
  },
];
