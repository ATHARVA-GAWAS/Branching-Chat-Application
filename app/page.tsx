// Filename: app/page.tsx
import Chat from './components/Chat';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">ChatGPT Clone</h1>
      <Chat />
    </div>
  );
}
