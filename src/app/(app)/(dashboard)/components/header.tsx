import { Suspense } from 'react'

export default async function DashboardHeader() {
	return (
		<div className="my-8 flex flex-col space-y-4 sm:flex-row">
			<div>
				<Suspense fallback={<h1>Loading...</h1>}>
					<h1 className="font-bold text-2xl">Olá, Filipe!</h1>
				</Suspense>
				<p className="text-md">
					{Intl.DateTimeFormat('pt-BR', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					}).format(new Date())}
				</p>
			</div>
		</div>
	)
}
