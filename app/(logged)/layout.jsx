import { AuthProvider } from "@/src/context/AuthContext";

export const metadata = {
  title: "Money Manager",
  description:
    "Track and manage your personal expenses and income with our easy-to-use money management application",
};

export default function RootLayout({ children }) {
  return (
      <AuthProvider>{children}</AuthProvider>
  );
}
