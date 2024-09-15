"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const LeftSideBar = () => {
	const pathname = usePathname();
	const router = useRouter();
	return (
		<section className='left_sidebar'>
			<nav className='flex flex-col gap-6'>
				<Link
					href='/'
					className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center '>
					<Image src='/icons/logo.svg' width={23} height={27} alt='logo' />
					<h1 className='text-white-1 text-24 font-extrabold max-lg:hidden capitalize'>
						podcastr
					</h1>
				</Link>
				{sidebarLinks.map(({ route, icon, label }) => {
					const isActive =
						pathname === route || pathname.startsWith(`${route}/`);
					return (
						<Link
							key={label}
							href={route}
							className={cn(
								"flex cursor-pointer items-center gap-3 py-4 max-lg:px-4 justify-center lg:justify-start",
								{
									"bg-nav-focus border-r-4 border-orange-1 ": isActive,
								},
							)}>
							<Image src={icon} width={24} height={24} alt={`${label}-logo`} />
							<h1 className='text-white-1  capitalize'>{label}</h1>
						</Link>
					);
				})}
			</nav>
		</section>
	);
};

export default LeftSideBar;
