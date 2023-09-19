import { MarkdownEditor } from '@primer/react/drafts';
import { useState, useEffect } from "react";
import { BookmarkIcon, NorthStarIcon } from "@primer/octicons-react";
import "@primer/behaviors"; // Import @primer/behaviors package

const renderMarkdown = async () => `** Rendered Markdow **
> This is markdown`;

export default function Markdown() {
  const [value, setValue] = useState("");
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setWindowLoaded(true);
    });
    return () => {
      window.removeEventListener("load", () => {
        setWindowLoaded(true);
      });
    };
  }, []);

  if (!windowLoaded) {
    return null; // Render nothing until the window is loaded
  }

  return (
    <MarkdownEditor value={value} onChange={setValue} onRenderPreview={renderMarkdown}>
      <MarkdownEditor.Label visuallyHidden>Custom Buttons</MarkdownEditor.Label>

      <MarkdownEditor.Toolbar>
        <MarkdownEditor.ToolbarButton icon={NorthStarIcon} aria-label="Custom button 1" />
        <MarkdownEditor.DefaultToolbarButtons />
        <MarkdownEditor.ToolbarButton icon={BookmarkIcon} aria-label="Custom button 2" />
      </MarkdownEditor.Toolbar>

      <MarkdownEditor.Footer>
        <MarkdownEditor.FooterButton variant="danger">Custom Button</MarkdownEditor.FooterButton>
      </MarkdownEditor.Footer>
    </MarkdownEditor>
  );
}