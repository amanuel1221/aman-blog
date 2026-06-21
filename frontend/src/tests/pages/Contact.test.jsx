import { render, screen } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Contact from "../../pages/Contact";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  vi.restoreAllMocks();
});

test("renders contact section and heading", () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );


  expect(
    screen.getByText(/have a project in mind or just want to say hello/i)
  ).toBeInTheDocument();
});


test("form renders correctly", () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  expect(screen.getByTestId("input-name")).toBeInTheDocument();
  expect(screen.getByTestId("input-email")).toBeInTheDocument();
  expect(screen.getByTestId("input-company")).toBeInTheDocument();
  expect(screen.getByTestId("input-message")).toBeInTheDocument();
});


test("validates empty form", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(
    screen.getByText(/please tell me your name/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/i'll need your email/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/please say something/i)
  ).toBeInTheDocument();
});

test("validates wrong inputs", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  await user.type(screen.getByTestId("input-name"), "1234");
  await user.type(screen.getByTestId("input-email"), "wrongemail");

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(
    screen.getByText(/names usually don't have numbers/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/doesn't look like a valid email/i)
  ).toBeInTheDocument();
});

test("successful form submission", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "Message sent successfully 🚀 I'll get back to you soon.",
        }),
    })
  );

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  await user.type(screen.getByTestId("input-name"), "John");
  await user.type(screen.getByTestId("input-email"), "john@test.com");
  await user.type(screen.getByTestId("input-message"), "Hello");

  await user.click(screen.getByRole("button", { name: /send/i }));

  expect(
    await screen.findByText(/message sent successfully/i)
  ).toBeInTheDocument();
});


test("social links exist and have correct attributes", () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  expect(screen.getByTestId("github")).toHaveAttribute(
    "href",
    "https://github.com/amanuel1221"
  );

  expect(screen.getByTestId("linkedin")).toHaveAttribute(
    "target",
    "_blank"
  );

  expect(screen.getByTestId("twitter")).toBeInTheDocument();
  expect(screen.getByTestId("hacker-rank")).toBeInTheDocument();
  expect(screen.getByTestId("email")).toBeInTheDocument();
});


test("CV download button exists", () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("link", { name: /download cv/i })
  ).toBeInTheDocument();
});