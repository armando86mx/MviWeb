/** Restore straight double quotes after Astro's automatic smart punctuation. */
export default function remarkStraightQuotes({ slugs = [] } = {}) {
  return (tree, file) => {
    if (!slugs.includes(file.data.astro?.frontmatter?.slug)) return;

    const visit = (node) => {
      if (node.type === 'text') node.value = node.value.replace(/[“”«»]/g, '"');
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
