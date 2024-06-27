[
 "while"
 (break)
 (continue)
] @keyword.control.repeat

[
 "if"
 "else"
] @keyword.control.conditional

"return" @keyword.control.return

"fn" @keyword.function

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

(parameters (identifier) @variable.parameter)

(call (identifier) @function.call)

(identifier) @variable

(none) @constant.builtin

[(true) (false)] @constant.builtin.boolean

(int) @constant.numeric.integer
(float) @constant.numeric.float

(string) @string

(comment) @comment.line
