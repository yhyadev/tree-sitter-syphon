[
 "while"
 (break)
 (continue)
] @keyword.repeat

[
 "if"
 "else"
] @keyword.conditional

"fn" @keyword.function

"return" @keyword.return

(call (identifier) @function.call)

[
  "+"
  "-"
  "/"
  "*"
  "**"
  "%"
  "<"
  ">"
  "=="
  "="
  "+="
  "-="
  "/="
  "*="
  "**"
  "%="
] @operator


[
  ":"
  ","
  "."
] @punctuation.delimiter

[
 "("
 ")"
 "["
 "]"
 "{"
 "}"
] @punctuation.bracket

(identifier) @variable

(none) @constant.builtin

((true) (false)) @boolean

((int) (float)) @number

(string) @string

(comment) @comment
