import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SearchModal from "../../components/SearchModal";

test("checking the renders of navbar and links appearing correctly", async () => {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>,
    );

    const header = screen.getByTestId("navbar-header");
    const navbar = screen.getByTestId("navbar-nav");
    const logo = screen.getByText("Amanuel's Blog");
    const Home = screen.getByText("Home");
    const Blogs = screen.getByText("Blogs");
    const About = screen.getByText("About");
    const ContactMe = screen.getByText("Contact Me");


    expect(header).toBeInTheDocument();

    expect(navbar).toBeInTheDocument();

    expect(logo).toBeInTheDocument();

    
    expect(Home).toBeInTheDocument();
    expect(Blogs).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(ContactMe).toBeInTheDocument();



});
test("renders search modal when open is true", () => {
    render(
        <MemoryRouter>
            <SearchModal
                open={true}
                onClose={vi.fn()}
                posts={[]}
            />
        </MemoryRouter>
    );

    const searchModal = screen.getByTestId("search-modal");
    expect(searchModal).toBeInTheDocument();
});


test("checking the search modal is not rendered when the search open is false", () => {

    render(<MemoryRouter>
        <SearchModal
            open={false}
            onClose={vi.fn()}
            posts={[]}
        />
    </MemoryRouter>);

    const searchModal = screen.queryByTestId("search-modal");
    expect(searchModal).not.toBeInTheDocument();

});
test("toggles dark and light mode correctly", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );

    const toggleButton = screen.getByTestId("desktop-toggle-dark-mode");

    await user.click(toggleButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(toggleButton);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
});


test("hamburger menu opens, shows nav items, and closes correctly", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );

    const openMenuBtn = screen.getByTestId("mobile-menu-open");
    await user.click(openMenuBtn);

    const mobileNavs = await screen.findByTestId("mobile-navs");
    expect(mobileNavs).toBeInTheDocument();

    expect(screen.getByTestId("mobile-home")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-blogs")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-about")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-contact")).toBeInTheDocument();

    const closeMenuBtn = screen.getByTestId("mobile-menu-close");
    expect(closeMenuBtn).toBeInTheDocument();

    expect(screen.queryByTestId("mobile-menu-open")).not.toBeInTheDocument();

    await user.click(closeMenuBtn);

    expect(screen.queryByTestId("mobile-navs")).not.toBeInTheDocument();

    expect(screen.queryByTestId("mobile-home")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mobile-blogs")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mobile-about")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mobile-contact")).not.toBeInTheDocument();

    expect(screen.getByTestId("mobile-menu-open")).toBeInTheDocument();
});


test("test navbar links render with correct paths", () => {
    render(
        <MemoryRouter>

            <NavBar />
        </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: "Home" });
    const aboutLink = screen.getByRole("link", { name: "About" });
    const blogsLink = screen.getByRole("link", { name: "Blogs" });

    const contactLink = screen.getByText("Contact Me");
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(blogsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(blogsLink).toHaveAttribute("href", "/blogs");
    expect(contactLink).toHaveAttribute("href", "/contact");
});
test("loads dark mode from localStorage", () => {
  localStorage.setItem("theme", "dark");

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  expect(document.documentElement).toHaveClass("dark");

  expect(
    screen.getByTestId("desktop-toggle-dark-mode-sun")
  ).toBeInTheDocument();
});
test("updates localStorage when toggling theme", async () => {
  const user = userEvent.setup();

  const spy = vi.spyOn(Storage.prototype, "setItem");

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  await user.click(
    screen.getByTestId("desktop-toggle-dark-mode")
  );

  expect(spy).toHaveBeenCalledWith("theme", "dark");

  await user.click(
    screen.getByTestId("desktop-toggle-dark-mode")
  );

  expect(spy).toHaveBeenCalledWith("theme", "light");
});

test("locks body scrolling when mobile menu opens", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  expect(document.body.style.overflow).toBe("auto");

  await user.click(
    screen.getByTestId("mobile-menu-open")
  );

  expect(document.body.style.overflow).toBe("hidden");

  await user.click(
    screen.getByTestId("mobile-menu-close")
  );

  expect(document.body.style.overflow).toBe("auto");
});
test("opens search modal from desktop search button", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  await user.click(
    screen.getByTestId("desktop-search")
  );

  expect(
    screen.getByTestId("search-modal")
  ).toBeInTheDocument();
});
test("opens search modal from mobile search button", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  const buttons = screen.getAllByTestId(
    "navbar-mobile-search"
  );

  await user.click(buttons[0]);

  expect(
    screen.getByTestId("search-modal")
  ).toBeInTheDocument();
});
test("closes mobile menu when navigation link is clicked", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  await user.click(
    screen.getByTestId("mobile-menu-open")
  );

  await user.click(
    screen.getByTestId("mobile-home")
  );

  expect(
    screen.queryByTestId("mobile-navs")
  ).not.toBeInTheDocument();
});


