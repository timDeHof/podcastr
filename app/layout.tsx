import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ConvexWithClerkClientProvider from "./providers/ConvexWithClerkClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Podcastr",
	description: "Generate your pocasts using AI",
	icons: {
		icon: "/icons/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ConvexWithClerkClientProvider>
					{children}
				</ConvexWithClerkClientProvider>
			</body>
		</html>
	);
}
