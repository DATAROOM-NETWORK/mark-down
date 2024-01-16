import { DataroomElement }  from '/dataroom-element.js';
import "./vendor/markdown-it.min.js";
import { hljs } from "./vendor/highlight/highlight.min.js";
import { wrapHashtags } from './hash-tag.js';
const md = markdownit();


/*
  
  Remove Front Matter

  removes the code at the beginning of a markdown file
  for rendering

*/

function removeFrontMatter(content) {
  try {
    const yamlRegex = /^---\n([\s\S]*?)\n---/;
    return content.replace(yamlRegex, '').trim();
  } catch(e){
    return content
  }
}

class MarkDown extends DataroomElement {
  async initialize(){
    try {
      const data = await this.fetchData();
      const content = removeFrontMatter(data);
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