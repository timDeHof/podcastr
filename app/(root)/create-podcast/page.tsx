"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { voiceDetails } from "@/constants";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectValue,
	SelectContent,
	SelectTrigger,
	SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/generatePodcast";
import GenerateThumbnail from "@/components/generateThumbnail";
import { LoaderCircle } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
	podcastTitle: z.string().min(2, {
		message: "Podcast Title must be at least 2 characters.",
	}),
	podcastDescription: z.string().min(2, {
		message: "Podcast description must be at least 2 characters.",
	}),
});
function onSubmit(values: z.infer<typeof formSchema>) {
	// Do something with the form values.
	// ✅ This will be type-safe and validated.
	console.log(values);
}
const CreatePodcast = () => {
	const [imagePrompt, setImagePrompt] = React.useState<string>("");
	const [imageStorageId, setImageStorageId] =
		React.useState<Id<"_storage"> | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string>("");

	const [audioUrl, setAudioUrl] = React.useState<string>("");
	const [audioStorageId, setAudioStorageId] =
		React.useState<Id<"_storage"> | null>(null);
	const [audioDuration, setAudioDuration] = React.useState<number>(0);

	const [voiceType, setVoiceType] = React.useState<
		SpeechCreateParams["voice"] | null
	>(null);
	const [voicePrompt, setVoicePrompt] = React.useState<string>("");

	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			podcastTitle: "",
			podcastDescription: "",
		},
	});
	return (
		<section className='mt-10 flex flex-col'>
			<h1 className='text-20 font-bold text-white-1'>Create a Podcast</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mt-12 flex w-full flex-col'>
					<div className='flex flex-col gap-[30px] border-b border-black-5 pb-10'>
						<FormField
							control={form.control}
							name='podcastTitle'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 text-white-1 font-bold'>
										Title
									</FormLabel>
									<FormControl>
										<Input
											className='input-class focus-visible: ring-offset-orange-1'
											placeholder='Tim Pro Podcast'
											{...field}
										/>
									</FormControl>

									<FormMessage className='text=white-1' />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-2.5'>
							<Label className='text-16 text-white-1 font-bold'>
								Select AI Voice
							</Label>

							<Select
								onValueChange={(value) =>
									setVoiceType(value as SpeechCreateParams["voice"])
								}>
								<SelectTrigger
									className={cn(
										"text-16 w-full border-none bg-black-1 text-gray-1 focus-visible: ring-offset-orange-1",
									)}>
									<SelectValue
										placeholder='Select AI Voice'
										className='placeholder:text-gray-1 capitalize'
									/>
								</SelectTrigger>
								<SelectContent className='bg-black-1 text-16 border-none font-bold text-white-1 focus:ring-orange-1'>
									{voiceDetails.map(({ id, name }) => (
										<SelectItem
											key={id}
											value={name}
											className='capitalize focus:bg-orange-1'>
											{name}
										</SelectItem>
									))}
								</SelectContent>
								{voiceType && (
									<audio
										src={`/${voiceType}.mp3`}
										autoPlay
										className='hidden'
									/>
								)}
							</Select>
						</div>
						<FormField
							control={form.control}
							name='podcastDescription'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 text-white-1 font-bold'>
										Description
									</FormLabel>
									<FormControl>
										<Textarea
											className='input-class focus-visible: ring-offset-orange-1'
											placeholder='Write a short podcast description...'
											{...field}
										/>
									</FormControl>

									<FormMessage className='text=white-1' />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex flex-col pt-10'>
						<GeneratePodcast
							setAudioStorageId={setAudioStorageId}
							setAudio={setAudioUrl}
							voiceType={voiceType!}
							audio={audioUrl}
							voicePrompt={voicePrompt}
							setVoicePrompt={setVoicePrompt}
							setAudioDuration={setAudioDuration}
						/>
						<GenerateThumbnail
							setImage={setImageUrl}
							setImageStorageId={setImageStorageId}
							image={imageUrl}
							imagePrompt={imagePrompt}
							setImagePrompt={setImagePrompt}
						/>
						<div className='mt-10 w-full'>
							<Button
								type='submit'
								className='text-16 w-full bg-orange-1 py-4 font-extrabold tracking-wider text-white-1 transition-all duration-500 hover:bg-black-1'>
								{isSubmitting ? (
									<>
										Submitting
										<LoaderCircle size={20} className='animate-spin ml-2' />
									</>
								) : (
									"Submit & Publish Podcast"
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default CreatePodcast;
