# tree-sitter-syphon

[![discord][discord]](https://discord.gg/w7nTvsVJhm)
[![matrix][matrix]](https://matrix.to/#/#tree-sitter-chat:matrix.org)

Syphon grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

[discord]: https://img.shields.io/discord/1063097320771698699?logo=discord&label=discord
[matrix]: https://img.shields.io/matrix/tree-sitter-chat%3Amatrix.org?logo=matrix&label=matrix

## Installation

### Helix

- Go to your config (~/.config/helix on Linux for example) and add this to your "languages.toml" file

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

- Now, copy the queries from [queries/helix](queries/helix) to your runtime/queries/syphon directory

- And lastly run this commands to fetch and build the parser

```
hx -g fetch
hx -g build
```
