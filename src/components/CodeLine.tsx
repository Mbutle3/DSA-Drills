const KEYWORDS =
  /\b(def|class|return|if|elif|else|for|while|import|from|in|not|and|or|None|True|False|lambda|pass|break|continue|with|as|is|yield|raise|try|except|finally|global|nonlocal|assert|del|async|await)\b/g;

const STRING = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;
const NUMBER = /\b\d+(?:\.\d+)?\b/g;
const COMMENT = /(#.*)$/;

type Token = { type: "keyword" | "string" | "number" | "comment" | "text"; value: string };

function tokenizeLine(line: string): Token[] {
  const commentMatch = COMMENT.exec(line);
  const codePart = commentMatch ? line.slice(0, commentMatch.index) : line;
  const commentPart = commentMatch ? commentMatch[0] : "";

  const tokens: Token[] = [];
  let remaining = codePart;

  while (remaining.length > 0) {
    KEYWORDS.lastIndex = 0;
    STRING.lastIndex = 0;
    NUMBER.lastIndex = 0;

    const kw = KEYWORDS.exec(remaining);
    const str = STRING.exec(remaining);
    const num = NUMBER.exec(remaining);

    const matches = [
      kw ? { type: "keyword" as const, match: kw, index: kw.index } : null,
      str ? { type: "string" as const, match: str, index: str.index } : null,
      num ? { type: "number" as const, match: num, index: num.index } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    const first = matches[0];
    if (!first || first.index > 0) {
      const end = first ? first.index : remaining.length;
      tokens.push({ type: "text", value: remaining.slice(0, end) });
      remaining = remaining.slice(end);
      if (!first) break;
      continue;
    }

    tokens.push({ type: first.type, value: first.match[0] });
    remaining = remaining.slice(first.match[0].length);
  }

  if (commentPart) {
    tokens.push({ type: "comment", value: commentPart });
  }

  return tokens;
}

const TOKEN_CLASS: Record<Token["type"], string> = {
  keyword: "text-violet",
  string: "text-correct",
  number: "text-amber",
  comment: "text-muted",
  text: "text-text",
};

interface CodeLineProps {
  line: string;
  className?: string;
}

export function CodeLine({ line, className = "" }: CodeLineProps) {
  const tokens = tokenizeLine(line);

  return (
    <code className={`font-mono text-sm leading-relaxed ${className}`}>
      {tokens.map((token, i) => (
        <span key={i} className={TOKEN_CLASS[token.type]}>
          {token.value}
        </span>
      ))}
    </code>
  );
}
