import "./globals.css";

export const metadata = {
  title: "houzIt",
  description: "A place to find home",
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