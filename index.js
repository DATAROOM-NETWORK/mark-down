import { DataroomElement }  from '/dataroom-element.js';
import { hljs } from "./vendor/highlight/highlight.min.js";
import './vendor/mermaid.min.js';
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

mermaid.initialize({ 
  startOnLoad: false,   
  theme: 'base', // 'base' is the default theme that is monochrome
  themeVariables: {
    darkMode: 'true',
    backgroundColor: '#555555',
    primaryColor: '#ffffff',
    primaryTextColor: '#fff',
    primaryBorderColor: '#555555',
    lineColor: '#aaaaaa',
    secondaryColor: '#aaaaaa',
    tertiaryColor: '#999999',
    fontFamily: 'Atkinson Hyperlegible',
    fontSize: '12px'
  }
});




class MarkDown extends DataroomElement {
  async initialize(){
    this.dtrm_id = this.getAttribute('dtrm-id');
    this.notebook = localStorage.getItem('notebook') || 'default';

    try {
      const fetched_data = await this.fetch(`/get-notebook-page`, {
        notebook: this.notebook, 
        dtrmId: this.dtrm_id
      });
      const data = fetched_data.content
      const content = removeFrontMatter(data);
      this.metadata = parseJSONFrontmatter(data);
      this.renderMarkdown(content);
      await mermaid.run({
        querySelector: '.language-mermaid',
      });

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