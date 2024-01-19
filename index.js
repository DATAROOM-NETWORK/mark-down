import { DataroomElement }  from '/dataroom-element.js';
import { hljs } from "./vendor/highlight/highlight.min.js";
import "./vendor/markdown-it.min.js";
import { wrapHashtags } from './hash-tag.js';
import { removeFrontMatter, parseJSONFrontmatter } from './front-matter.js';
const md = markdownit({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});


class MarkDown extends DataroomElement {
  async initialize(){
    try {
      const data = await this.fetchData();
      const content = removeFrontMatter(data);
      this.metadata = parseJSONFrontmatter(data);
      this.renderMarkdown(content);
    } catch(e){
      console.error('ERROR', e);
      this.innerHTML = 'ERROR, please check console';
    }
  }

  renderMarkdown(content) {
    const renderedContent = md.render(content);
    const hashtags = wrapHashtags(renderedContent);

    this.innerHTML = `<div>${hashtags}</div>`;
    
    // Highlight code blocks using hljs
    this.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

}

customElements.define('mark-down', MarkDown)