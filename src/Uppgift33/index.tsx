//
import Section from "./section.tsx"
import "./index.css"

function Uppgift33() {
	const content = [
		{
			title: "Hot",
			p1: "Hot freshly ground coffe or cup of exquisite tea?",
			p2: "We give you that perfect cup every time",
			table: [
				["Mocha Latte", "€ 7.50"],
				["Caffe Formaggio", "€ 5.00"],
				["Espresso", "€ 3.50"],
				["Chai Verde Latte", "€ 5.50"],
			],
		},
		{
			title: "Juicy",
			p1: "Ripe fruit - freshly squeezed.",
			p2: "It's simple as that. Chunky or smooth - it's your choice.",
			table: [
				["Branched Apricots", "€ 4.20"],
				["Deep Rasberries", "€ 3.50"],
				["Smooth Oranges", "€ 6.50"],
			],
		},
		{
			title: "Cosy",
			p1: "Hang around. Enjoy the settings.",
			p2: "Use our fast WiFi. Borrow a newspaper or a novel.",
			table: [
				["Mon-Sun", "8am - 11pm"],
				["Caffe Retro", "Canto VI"],
				["0123-45 67 89", "Caffe@lorem.pge"],
			],
		},
	]

	return (
		<article id="uppgift33">
			<header>
				<nav>
					{content.map(({ title }) => (
						<a key={title} href={`#${title.toLowerCase()}`}>
							{title}
						</a>
					))}
				</nav>
			</header>

			<main>
				{content.map(sectionData => (
					<Section key={sectionData.title} {...sectionData} />
				))}
			</main>
		</article>
	)
}

export default Uppgift33
