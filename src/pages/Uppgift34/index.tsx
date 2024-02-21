import "./index.scss"

function Uppgift34() {
	return (
		<article id="uppgift34">
			<div id="background2"></div>
			<div id="background1"></div>

			<div id="player">
				<header>
					<button className="material-icons active">
						arrow_back_ios
					</button>
					<p id="playlist-title">Playlist - ???</p>
					<button className="material-icons active">more_vert</button>
				</header>

				<aside>
					<ol id="playlist"></ol>
				</aside>
				<main>
					<img id="album-cover" src="./placeholder.png" />

					<nav>
						<button id="add" className="material-icons active">
							add_circle_outline
						</button>
						<p id="title">
							Artist Name
							<br />
							<small>Song Title</small>
						</p>
						<button id="favorite" className="material-icons">
							favorite
						</button>

						<p id="play-time">0:00</p>
						<input
							id="play-progress"
							type="range"
							defaultValue="0"
							min="0"
							max="0"
						/>
						<p id="length">0:00</p>

						<button id="repeat" className="material-icons">
							repeat
						</button>
						<div>
							<button
								id="rewind"
								className="material-icons active fast-rewind"
							>
								fast_rewind
							</button>
							<button
								id="play-pause"
								className="material-icons active play-circle"
							>
								play_circle
							</button>
							<button
								id="forward"
								className="material-icons active fast-forward"
							>
								fast_forward
							</button>
						</div>
						<button id="shuffle" className="material-icons">
							shuffle
						</button>

						<audio id="audio" src=""></audio>
					</nav>
				</main>
			</div>
		</article>
	)
}

export default Uppgift34
