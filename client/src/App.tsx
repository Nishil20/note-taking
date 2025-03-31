import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">NoteTaker</h1>
          <p className="mt-2 text-muted-foreground">
            A simple note-taking application
          </p>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <p className="mb-4">Button component example:</p>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="mt-8 p-4 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-lg font-semibold">🎉 Project setup complete!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            React + Tailwind CSS + shadcn/ui is ready to go. Next step is setting up the Express backend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
