/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//

/**
 * @param {Rule} rule
 *
 * @return {Rule}
 */
function commaSeparated(rule) {
    return seq(rule, repeat(seq(",", rule)));
}

module.exports = grammar({
    name: "syphon",

    extras: ($) => [$.comment, /\s/],

    precedences: (_) => [
        [
            "subscript",
            "call",
            "prefix",
            "exponent",
            "product",
            "sum",
            "comparison",
            "assign",
        ],
    ],

    conflicts: ($) => [
        [$.return, $.binary_operation],
        [$.return, $.call],
        [$.return, $.subscript],
        [$._statement, $.binary_operation],
        [$._statement, $.call],
        [$._statement, $.subscript],
    ],

    word: ($) => $.identifier,

    rules: {
        module: ($) => repeat($._statement),

        _statement: ($) =>
            choice($.if, $.while, $.break, $.continue, $.return, $._expression),

        if: ($) =>
            seq(
                "if",
                field("condition", $._expression),
                $.body,
                field("fallback", optional(seq("else", choice($.if, $.body)))),
            ),

        while: ($) => seq("while", field("condition", $._expression), $.body),
        break: (_) => "break",
        continue: (_) => "continue",

        return: ($) => seq("return", $._expression),

        _expression: ($) => choice($._unary_expression, $._binary_expression),

        _unary_expression: ($) =>
            choice(
                $.none,
                $.identifier,
                $.string,
                $.int,
                $.float,
                $.array,
                $.function,
                $.map,
                $.true,
                $.false,
                $.parentheses_expression,
                $.unary_operation,
            ),

        identifier: (_) => token(/[_a-zA-Z][_a-zA-Z0-9]*/),

        string: (_) =>
            seq('"', field("content", /[^"\\]*(?:\\.[^"\\]*)*/), '"'),

        int: (_) => token(/[0-9][_a-zA-Z0-9]+/),

        float: (_) => token(/[0-9]\.[0-9]*/),

        array: ($) =>
            seq(
                "[",
                optional(commaSeparated($._expression)),
                optional(","),
                "]",
            ),

        function: ($) => seq("fn", $.parameters, $.body),

        parameters: ($) =>
            seq(
                "(",
                optional(commaSeparated($.identifier)),
                ")",
                optional(","),
            ),

        body: ($) => seq("{", repeat($._statement), "}"),

        map: ($) =>
            seq("{", optional(commaSeparated($.pair)), optional(","), "}"),

        pair: ($) =>
            seq(
                field("key", $._expression),
                ":",
                field("value", $._expression),
            ),

        true: (_) => "true",
        false: (_) => "false",

        none: (_) => "none",

        parentheses_expression: ($) => seq("(", $._expression, ")"),

        unary_operation: ($) =>
            prec.left(
                "prefix",
                seq(
                    field("operator", choice("-", "!")),
                    field("lhs", $._expression),
                ),
            ),

        _binary_expression: ($) =>
            choice($.call, $.assign, $.subscript, $.member, $.binary_operation),

        call: ($) => prec.left("call", seq($._expression, $.arguments)),

        arguments: ($) =>
            seq(
                "(",
                optional(commaSeparated($._expression)),
                optional(","),
                ")",
            ),

        assign: ($) =>
            prec.left(
                "assign",
                seq(
                    field("target", $._expression),
                    field(
                        "operator",
                        choice("+=", "-=", "/=", "*=", "**=", "%=", "="),
                    ),
                    field("value", $._expression),
                ),
            ),

        subscript: ($) =>
            prec.left(
                "subscript",
                seq(
                    field("target", $._expression),
                    "[",
                    field("index", $._expression),
                    "]",
                ),
            ),

        member: ($) =>
            seq(
                field("target", $._expression),
                ".",
                field("key", $.identifier),
            ),

        binary_operation: ($) =>
            choice(
                ...[
                    ["+", "sum"],
                    ["-", "sum"],
                    ["*", "sum"],
                    ["/", "product"],
                    ["%", "product"],
                    ["**", "exponent", "right"],
                    ["<", "comparison"],
                    [">", "comparison"],
                    ["==", "comparison"],
                    ["!=", "comparison"],
                ].map(([operator, precedence, associativity]) =>
                    (associativity === "right" ? prec.right : prec.left)(
                        precedence,
                        seq(
                            field("lhs", $._expression),
                            field("operator", operator),
                            field("rhs", $._expression),
                        ),
                    ),
                ),
            ),

        comment: (_) => token(seq("#", field("content", /[^\n]*/))),
    },
});
