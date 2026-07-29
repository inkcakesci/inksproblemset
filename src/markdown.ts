import DOMPurify from 'dompurify'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })
export const renderMarkdown = (source: string) => DOMPurify.sanitize(markdown.render(source))
