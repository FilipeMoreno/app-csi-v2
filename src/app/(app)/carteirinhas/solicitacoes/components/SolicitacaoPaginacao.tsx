import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { useState } from 'react'

interface PaginatedListProps<T> {
	items: T[]
	renderItem: (item: T) => JSX.Element
	itemsPerPage?: number
}

export default function SolicitacaoPaginacao<T>({
	items,
	renderItem,
	itemsPerPage = 10,
}: PaginatedListProps<T>) {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(items.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentItems = items.slice(startIndex, endIndex)

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	return (
		<div className="w-full">
			<div className="flex flex-col space-y-2">
				{currentItems.map((item, index) => (
					<div key={index}>{renderItem(item)}</div>
				))}
			</div>
			<Pagination className="mt-4">
				<PaginationContent>
					{currentPage > 1 && (
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() => handlePageChange(currentPage - 1)}
							/>
						</PaginationItem>
					)}
					{Array.from({ length: totalPages }, (_, index) => {
						const pageNumber = index + 1
						return (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									href="#"
									isActive={pageNumber === currentPage}
									onClick={() => handlePageChange(pageNumber)}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						)
					})}
					{currentPage < totalPages && (
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() => handlePageChange(currentPage + 1)}
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	)
}
