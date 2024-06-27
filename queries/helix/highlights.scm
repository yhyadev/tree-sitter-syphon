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

[(none) (true) (false)]  @constant.builtin

[(true) (false)] @boolean

(int) @numeric.integer
(float) @numeric.float

(string) @string

(comment) @comment.line
