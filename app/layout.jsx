import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Provider from "./context/provider";
import { AuthContextProvider } from "./context/authcontext";
import { ExploreContextProvider } from "./context/explorecontext";
import { InternshipContextProvider } from "./context/internshipcontext";
export const metadata = {
  title: "CareerLink",
  description:
    "Empowering futures, one opportunity at a time. Connect, Grow, and Achieve with CareerLink Where Talent Meets Opportunity.",
  icons: {
    icon: "/logo.png", // /public path
  },
};
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ExploreContextProvider>
          <Provider>
            <AuthContextProvider>
              <InternshipContextProvider>
                <Navbar />
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {children}
                <Footer />
              </InternshipContextProvider>
            </AuthContextProvider>
          </Provider>
        </ExploreContextProvider>
      </body>
    </html>
  );
}
