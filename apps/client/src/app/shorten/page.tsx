"use client"

import { useState } from "react"

export default function ShortenPage() {
	const [originalUrl, setOriginalUrl] = useState("")
	const [shortenedUrl, setShortenedUrl] = useState("")
	// const handleShortenUrl = () => {}

	return (
		<div>
			<h1>URL Shortener</h1>
			<input
				type="text"
				name=""
				id=""
				placeholder="Enter your URL"
				value={originalUrl}
				onChange={(e) => setOriginalUrl(e.target.value)}
				// onSubmit={handleShortenUrl}
			/>
			{/* <button onClick={handleShortenUrl}>Shorten</button> */}
			{shortenedUrl && (
				<div className="flex justify-between items-center">
					<p>
						Shortened URL:{" "}
						<a className="text-md text-sky-500" href={shortenedUrl}>
							{shortenedUrl}
						</a>
					</p>
					<div className="w-fit rounded-md p-2 my-2 border hover:bg-slate-600"></div>
				</div>
			)}
		</div>
	)
}
