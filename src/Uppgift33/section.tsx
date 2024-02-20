import "./section.css"

function Section({
	title,
	p1,
	p2,
	table,
}: {
	title: string
	p1: string
	p2: string
	table: Array<Array<string>>
}) {
	return (
		<section id={title}>
			<h1>{title}</h1>
			<p>{p1}</p>
			<p>{p2}</p>

			<table>
				<tbody>
					{table.map((row: Array<string>) => (
						<tr>
							<th>{row[0]}</th>
							<th>{row[0]}</th>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}

export default Section
