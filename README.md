# Markdown Component

This library provides a custom web component, `<mark-down>`, that renders Markdown content with support for syntax highlighting via Highlight.js and diagram rendering with Mermaid. It's designed for seamless integration into web projects, enabling the rich display of textual content alongside dynamic diagrams and code snippets.

## How to use

Include the index.js and index.css files into your site:

```html
<script type="module" src="https://dataroom-network.github.io/mark-down/index.js"></script>
<link rel="stylesheet" type="text/css" href="https://dataroom-network.github.io/mark-down/index.css">

<mark-down>

# Markdown Content Here
</mark-down>
```

## Features

- **Markdown Rendering:** Uses `markdown-it` to render Markdown content into HTML.
- **Syntax Highlighting:** Leverages Highlight.js for syntax highlighting within code blocks.
- **Mermaid Diagrams:** Integrates Mermaid for rendering diagrams specified in Markdown.
- **Customizable:** Supports customization of Mermaid themes and initialization options.
- **Hashtag Wrapping:** Includes functionality to wrap hashtags within the rendered content for additional processing or styling.


1. Include the `<mark-down>` element in your HTML.

```html
<mark-down>
  # Markdown Content Here
  ```javascript
  // Your code here
  ```
  ```mermaid
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
  ```
</mark-down>
```

2. The content within the `<mark-down>` tag will automatically be rendered as HTML, with code blocks highlighted and Mermaid diagrams rendered.

## Customization

You can customize the appearance and behavior of the Mermaid diagrams by adjusting the `mermaid.initialize` configuration in `dataroom-element.js`. For more details, refer to the [Mermaid documentation](https://mermaid-js.github.io/mermaid/#/).
