import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotesGrid from "../../components/NotesGrid";
import notesData from "../../store/notesData";

describe("NotesGrid Component", () => {
  it("renders notes grid container", () => {
    render(<NotesGrid />);

    expect(screen.getByTestId("notes-grid")).toBeInTheDocument();
    expect(screen.getByTestId("notes-grid-container")).toBeInTheDocument();
  });

  it("renders all note cards", () => {
    render(<NotesGrid />);

    const cards = screen.getAllByTestId("notes-grid-card");

    expect(cards.length).toBe(notesData.length);
  });

  it("renders card titles correctly", () => {
    render(<NotesGrid />);

    notesData.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it("renders card status correctly", () => {
    render(<NotesGrid />);

    notesData.forEach((card) => {
      expect(screen.getByText(card.status)).toBeInTheDocument();
    });
  });

  it("renders card icons with correct alt text", () => {
    render(<NotesGrid />);

    const images = screen.getAllByTestId("notes-grid-card-icon");

    images.forEach((img, index) => {
      expect(img).toHaveAttribute(
        "alt",
        `${notesData[index].title} icon`
      );
      expect(img).toHaveAttribute("src", notesData[index].iconUrl);
    });
  });

  it("renders all list items", () => {
    render(<NotesGrid />);

    const items = screen.getAllByTestId("notes-grid-card-item-text");

    expect(items.length).toBeGreaterThan(0);

    items.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it("renders correct number of items per card", () => {
    render(<NotesGrid />);

    const totalItems = notesData.reduce(
      (acc, card) => acc + card.items.length,
      0
    );

    const renderedItems = screen.getAllByTestId("notes-grid-card-item-text");

    expect(renderedItems.length).toBe(totalItems);
  });
});