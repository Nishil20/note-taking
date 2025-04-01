import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback, useEffect, useState } from 'react'
import { EditorToolbar } from './EditorToolbar'
import { useAutosave } from '../../hooks/useAutosave'

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  onSave?: (content: string) => Promise<void>
  className?: string
  autosave?: boolean
  debounceMs?: number
}

export const RichTextEditor = ({ 
  content = '', 
  onChange,
  onSave,
  className = '',
  autosave = true,
  debounceMs = 1000
}: RichTextEditorProps) => {
  // Track content state internally to handle autosave
  const [currentContent, setCurrentContent] = useState(content)

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[150px] px-4',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setCurrentContent(html)
      onChange?.(html)
    },
  })

  // Update editor content if the prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  // Set up autosave
  const { forceSave } = useAutosave({
    content: currentContent,
    onSave: onSave || (() => Promise.resolve()),
    debounceMs,
    enabled: autosave && !!onSave
  })

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Save on Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      forceSave()
    }
  }, [forceSave])

  return (
    <div 
      className={`w-full border border-gray-200 rounded-lg ${className}`}
      onKeyDown={handleKeyDown}
    >
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
} 