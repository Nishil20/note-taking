import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import { Button } from "../ui/button"
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Highlighter } from "lucide-react"
import { cn } from "../../lib/utils"

interface NoteEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
}

export function NoteEditor({ content, onChange, className }: NoteEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
      Highlight,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[400px]",
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-p:leading-7",
          "prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4",
          "prose-code:rounded-md prose-code:bg-muted prose-code:px-1 prose-code:py-0.5",
          "prose-a:text-primary prose-a:underline prose-a:underline-offset-4"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Update editor content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const ToolbarButton = ({ 
    isActive, 
    onClick, 
    children 
  }: { 
    isActive: boolean
    onClick: () => void
    children: React.ReactNode 
  }) => (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  )

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-1 border-b pb-2">
        <ToolbarButton
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("Enter the URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="flex-1" />
    </div>
  )
} 