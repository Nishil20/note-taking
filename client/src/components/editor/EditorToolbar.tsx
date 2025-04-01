import { Editor } from '@tiptap/react'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Quote
} from 'lucide-react'

interface EditorToolbarProps {
  editor: Editor | null
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title: string
}

const ToolbarButton = ({ onClick, isActive, children, title }: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100' : ''}`}
    title={title}
  >
    {children}
  </button>
)

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center gap-1 border-b border-gray-200 p-2">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="w-5 h-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="w-5 h-5" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="w-5 h-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Numbered List"
      >
        <ListOrdered className="w-5 h-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote className="w-5 h-5" />
      </ToolbarButton>
    </div>
  )
} 