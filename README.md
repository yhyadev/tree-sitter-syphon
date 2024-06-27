# tree-sitter-syphon

[![discord][discord]](https://discord.gg/w7nTvsVJhm)
[![matrix][matrix]](https://matrix.to/#/#tree-sitter-chat:matrix.org)

Syphon grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

[discord]: https://img.shields.io/discord/1063097320771698699?logo=discord&label=discord
[matrix]: https://img.shields.io/matrix/tree-sitter-chat%3Amatrix.org?logo=matrix&label=matrix

## Installation

### Helix

1 - Add this to your `languages.toml` file

```toml
[[language]]
name = "syphon"
scope = "scope.syphon"
injection-regex = "syphon"
file-types = ["sy"]
comment-tokens = ["#"]
indent = { tab-width = 4, unit = " " }
shebangs = ["syphon"]

[[grammar]]
name = "syphon"
source = { git = "https://github.com/yhyadev/tree-sitter-syphon", rev = "<PUT THE COMMIT REVISION HERE>" }
```

2 - Now, copy the queries from [queries/helix](queries/helix) to `runtime/queries/syphon` directory inside the root of local config

3 - And lastly run this commands to fetch and build the parser

```
hx -g fetch
hx -g build
```

### Neovim

1 - Add this to your init.lua file if you use nvim-treesitter

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.syphon = {
    install_info = {
        url = "https://github.com/yhyadev/tree-sitter-syphon",
        files = { "src/parser.c" },
        rev = "<PUT THE COMMIT REVISION HERE>",
    },

    filetype = "sy"
}

vim.filetype.add({
    extension = {
        sy = "syphon"
    }
})
```

2 - Now, copy the queries from [queries/nvim](queries/nvim) to `queries/syphon` directory inside the root of local config

3 - And lastly restart neovim and then run `:TSUpdate`
