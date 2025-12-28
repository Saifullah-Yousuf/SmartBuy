// import { Outfit } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import StoreProvider from "@/app/StoreProvider";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";

// const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

// export const metadata = {
//     title: "GoCart. - Shop smarter",
//     description: "GoCart. - Shop smarter",
// };

// export default function RootLayout({ children }) {
//     return (
//         <ClerkProvider>
//         <html lang="en">
//             <body className={`${outfit.className} antialiased`}>
//                 <StoreProvider>
//                     <Toaster />
//                     {children}
//                 </StoreProvider>
//             </body>
//         </html>
//         </ClerkProvider>
//     );
// }






import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "GoCart. - Shop smarter",
  description: "GoCart. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
