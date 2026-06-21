import { render, screen,fireEvent,waitFor} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import CodeBlock from "../../components/CodeBlock";

const mockClipboard = {
  writeText: vi.fn().mockResolvedValue(undefined),
};

Object.assign(navigator, {
  clipboard: mockClipboard,
});

vi.mock('react-icons/fa', () => ({
  FaCopy: () => <svg data-testid="copy-icon" />,
  FaCheck: () => <svg data-testid="check-icon" />,
}));

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockClipboard.writeText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });




it("copies code to clipboard when copy button is clicked", async () => {
  render(<CodeBlock>{"const x = 1;"}</CodeBlock>);

  fireEvent.click(screen.getByTestId("copy-code-button"));

  expect(mockClipboard.writeText).toHaveBeenCalledWith("const x = 1;");
});
  it('renders the code content correctly', () => {
    const code = 'const hello = "world";';
    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('renders with default language when not provided', () => {
    const code = 'console.log("test");';
    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByText('code')).toBeInTheDocument();
  });

  it('renders with custom language when provided', () => {
    const code = 'console.log("test");';
    render(<CodeBlock language="javascript">{code}</CodeBlock>);

    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('renders code block with correct data-testid attributes', () => {
    const code = 'test code';
    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByTestId('code-block')).toBeInTheDocument();
    expect(screen.getByTestId('code-block-header')).toBeInTheDocument();
    expect(screen.getByTestId('copy-code-button')).toBeInTheDocument();
  });

  it('removes trailing newline from code', () => {
    const code = 'const x = 1;\n';
    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('handles multi-line code correctly', () => {
    const code = `line 1\nline 2\nline 3`;
    render(<CodeBlock>{code}</CodeBlock>);

    const codeElement = document.querySelector('code');
    expect(codeElement?.textContent).toContain('line 1');
    expect(codeElement?.textContent).toContain('line 2');
    expect(codeElement?.textContent).toContain('line 3');
  });

  it('handles empty code content', () => {
    render(<CodeBlock>{''}</CodeBlock>);

    const codeElement = document.querySelector('code');
    expect(codeElement?.textContent).toBe('');
  });

  it('handles code with special characters', () => {
    const code = 'const x = "& < > \' \"";';
    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByText('const x = "& < > \' \"";')).toBeInTheDocument();
  });

  it('handles code that is a number', () => {
    render(<CodeBlock>{123}</CodeBlock>);

    expect(screen.getByText('123')).toBeInTheDocument();
  });





});