import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import CodeBlock from "../../components/CodeBlock";

const mockWriteText = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  mockWriteText.mockResolvedValue(undefined);

  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: mockWriteText,
    },
    writable: true,
    configurable: true,
  });
});

vi.mock("react-icons/fa", () => ({
  FaCopy: () => <svg data-testid="copy-icon" />,
  FaCheck: () => <svg data-testid="check-icon" />,
}));

describe("CodeBlock", () => {

 


  it("shows copied state after clicking copy button", async () => {
    const user = userEvent.setup();

    render(
      <CodeBlock>
        {"const x = 1;"}
      </CodeBlock>
    );

    await user.click(
      screen.getByTestId("copy-code-button")
    );

    expect(
      await screen.findByText("Copied!")
    ).toBeInTheDocument();
  });


  it("renders the code content correctly", () => {
    const code = 'const hello = "world";';

    render(
      <CodeBlock>
        {code}
      </CodeBlock>
    );

    expect(
      screen.getByText(code)
    ).toBeInTheDocument();
  });


  it("renders with default language when not provided", () => {
    render(
      <CodeBlock>
        {"console.log('test');"}
      </CodeBlock>
    );

    expect(
      screen.getByText("code")
    ).toBeInTheDocument();
  });


  it("renders with custom language when provided", () => {
    render(
      <CodeBlock language="javascript">
        {"console.log('test');"}
      </CodeBlock>
    );

    expect(
      screen.getByText("javascript")
    ).toBeInTheDocument();
  });


  it("renders required test ids", () => {
    render(
      <CodeBlock>
        {"test code"}
      </CodeBlock>
    );

    expect(
      screen.getByTestId("code-block")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("code-block-header")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("copy-code-button")
    ).toBeInTheDocument();
  });


  it("removes trailing newline from code", () => {
    render(
      <CodeBlock>
        {"const x = 1;\n"}
      </CodeBlock>
    );

    expect(
      screen.getByText("const x = 1;")
    ).toBeInTheDocument();
  });


  it("handles multi-line code correctly", () => {
    render(
      <CodeBlock>
        {`line 1
line 2
line 3`}
      </CodeBlock>
    );

    const codeElement = document.querySelector("code");

    expect(codeElement.textContent)
      .toContain("line 1");

    expect(codeElement.textContent)
      .toContain("line 2");

    expect(codeElement.textContent)
      .toContain("line 3");
  });


  it("handles empty code content", () => {
    render(
      <CodeBlock>
        {""}
      </CodeBlock>
    );

    const codeElement = document.querySelector("code");

    expect(codeElement.textContent)
      .toBe("");
  });


  it("handles special characters inside code", () => {
    const code = `const x = "& < > ' "";`;

    render(
      <CodeBlock>
        {code}
      </CodeBlock>
    );

    expect(
      screen.getByText(code)
    ).toBeInTheDocument();
  });


  it("handles numeric children", () => {
    render(
      <CodeBlock>
        {123}
      </CodeBlock>
    );

    expect(
      screen.getByText("123")
    ).toBeInTheDocument();
  });

});