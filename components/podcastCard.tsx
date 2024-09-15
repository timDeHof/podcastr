import React from "react";
import Image from "next/image";
import Link from "next/link";
const PodcastCard = ({
	podcastId,
	title,
	description,
	imgUrl,
}: {
	podcastId: number;
	title: string;
	description: string;
	imgUrl: string;
}) => {
	return (
		<div className='flex flex-col'>
			<figure className='flex flex-col gap-2'>
				<Image
					src={imgUrl}
					width={174}
					height={174}
					alt={`${title}-logo`}
					className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
				/>
				<div>
					<h1 className='text-white-1 text-16 truncate font-bold'>{title}</h1>
					<h2 className='text-white-4 text-12 truncate font-normal capitalize'>
						{description}
					</h2>
				</div>
			</figure>
		</div>
	);
};

export default PodcastCard;
