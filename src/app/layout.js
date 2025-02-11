import "./globals.css";

export const metadata = {
  title: "Project Example",
  description: "A place to find home | Something's cooking...",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;