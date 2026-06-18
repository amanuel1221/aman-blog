import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../components/Footer";

test("checking the renders of Footer and links appearing correctly", async () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>,
    );

    const footer = screen.getByTestId("footer");
    const footerNav= screen.getByTestId("footer-navigation");
    const logo = screen.getByText("Amanuel's Blog");
    const Home = screen.getByText("Home");
    const Blogs = screen.getByText("Blogs");
    const About = screen.getByText("About");
    const ContactMe = screen.getByText("Contact Me");


    expect(footer).toBeInTheDocument();
    expect(footerNav).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(Home).toBeInTheDocument();
    expect(Blogs).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(ContactMe).toBeInTheDocument();



});
test("accessibility and existence of footer social icons", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  const github = screen.getByRole("link", { name: /github profile/i });
  const linkedin = screen.getByRole("link", { name: /linkedin profile/i });
  const email = screen.getByRole("link", { name: /email address/i });
  const portfolio = screen.getByRole("link", { name: /personal portfolio/i });

  expect(github).toBeInTheDocument();
  expect(linkedin).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(portfolio).toBeInTheDocument();
});


test("test footer links render with correct paths", () => {
    render(
        <MemoryRouter>

            <Footer/>
        </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: "Home" });
    const aboutLink = screen.getByRole("link", { name: "About" });
    const blogsLink = screen.getByRole("link", { name: "Blogs" });

    const contactLink = screen.getByRole("link", { name: "Contact Me" });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(blogsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(blogsLink).toHaveAttribute("href", "/blogs");
    expect(contactLink).toHaveAttribute("href", "/contact");
});


test("test footer social media links  render with correct paths", () => {
    render(
        <MemoryRouter>

            <Footer/>
        </MemoryRouter>
    );
    const github = screen.getByRole("link", { name: /github profile/i });
  const linkedin = screen.getByRole("link", { name: /linkedin profile/i });
  const email = screen.getByRole("link", { name: /email address/i });
  const portfolio = screen.getByRole("link", { name: /personal portfolio/i });

    const contactLink = screen.getByRole("link", { name: "Contact Me" });
    

    expect(contactLink).toHaveAttribute("href", "/contact");
});
test("Test the existance of paths and opened in the new tab",()=>{
    render(<MemoryRouter>
        <Footer/>
    </MemoryRouter>);
const github=screen.getByRole("link",{name:/github/i});
const linkedin=screen.getByRole("link",{name:/linkedin/i});
const mail=screen.getByRole("link",{name:/Email/i});

expect(github).toHaveAttribute("href","https://github.com/amanuel1221");
expect(linkedin).toHaveAttribute("href","https://linkedin.com/in/amanuel-amare-684234372");
expect(mail).toHaveAttribute("href","mailto:amanuelamare1227@gmail.com");
expect(github).toHaveAttribute("target","_blank");
expect(linkedin).toHaveAttribute("target","_blank");

});