import Image from "next/image";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='relative h-screen w-full'>
			<div className='absolute size-full'>
				<Image
					src='/images/bg-img.png'
					alt='background-image'
					fill
					className='size-full'
				/>
			</div>
			{children}
		</main>
	);
}
