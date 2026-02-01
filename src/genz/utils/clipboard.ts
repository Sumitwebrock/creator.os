// Clipboard utility with fallback for blocked Clipboard API
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    // Clipboard API blocked or failed, use fallback
  }

  // Fallback to legacy method
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}
