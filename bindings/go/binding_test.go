package tree_sitter_syphon_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-syphon"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_syphon.Language())
	if language == nil {
		t.Errorf("Error loading Syphon grammar")
	}
}
