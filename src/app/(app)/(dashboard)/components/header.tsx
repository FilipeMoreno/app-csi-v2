export default function DashboardHeader() {
	return (
		<div>
			<h1 className="font-bold text-2xl">Bom dia, Usuário!</h1>
			<p className="text-md">
				Hoje é {''}
				{Intl.DateTimeFormat('pt-BR', {
					weekday: 'long',
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				}).format(new Date())}
			</p>
		</div>
	)
}
