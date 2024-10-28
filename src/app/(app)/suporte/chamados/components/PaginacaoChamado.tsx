import { Button } from '@/components/ui/button'

interface PaginationProps {
	totalItems: number
	currentPage: number
	itemsPerPage: number
	onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
	totalItems,
	currentPage,
	itemsPerPage,
	onPageChange,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<div className="flex-1 text-muted-foreground text-sm">
				Mostrando {currentPage * itemsPerPage - itemsPerPage + 1} a{' '}
				{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}{' '}
				resultados
			</div>
			<div className="space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Próximo
				</Button>
			</div>
		</div>
	)
}
