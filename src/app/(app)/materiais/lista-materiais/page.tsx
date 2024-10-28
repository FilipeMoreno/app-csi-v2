'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import html2pdf from 'html2pdf.js'
import React, { useEffect, useRef, useState } from 'react'

const ListaMateriaisIndex = () => {
	const [materialDescription, setMaterialDescription] = useState('')
	const [materialQuantity, setMaterialQuantity] = useState('')
	const [materials, setMaterials] = useState([])
	const [grade, setGrade] = useState('')
	const [classGroup, setClassGroup] = useState('')
	const pdfRef = useRef(null)

	// Carregar lista salva no localStorage ao escolher série e turma
	useEffect(() => {
		if (grade && classGroup) {
			const savedList = localStorage.getItem(`materiais-${grade}-${classGroup}`)
			if (savedList) {
				setMaterials(JSON.parse(savedList))
			} else {
				setMaterials([])
			}
		}
	}, [grade, classGroup])

	// Salvar lista no localStorage toda vez que a lista mudar
	useEffect(() => {
		if (grade && classGroup) {
			localStorage.setItem(
				`materiais-${grade}-${classGroup}`,
				JSON.stringify(materials),
			)
		}
	}, [materials, grade, classGroup])

	const handleAddMaterial = () => {
		if (materialDescription.trim() && materialQuantity.trim()) {
			setMaterials([
				...materials,
				{
					description: materialDescription,
					quantity: Number(materialQuantity),
				},
			])
			setMaterialDescription('')
			setMaterialQuantity('')
		}
	}

	const handleRemoveMaterial = (index) => {
		const updatedMaterials = materials.filter((_, i) => i !== index)
		setMaterials(updatedMaterials)
	}

	const handleDownloadPDF = () => {
		const element = pdfRef.current
		const pdfOptions = {
			filename: 'lista_materiais.pdf',
			html2canvas: { scale: 2 },
			jsPDF: { orientation: 'portrait' },
			pagebreak: { mode: ['avoid-all'] },
		}
		html2pdf().set(pdfOptions).from(element).save()
	}

	return (
		<div className="flex flex-col items-center gap-8 p-8">
			<h1 className="text-2xl font-bold">Lista de Materiais</h1>

			<div className="flex gap-4">
				<Select onValueChange={setGrade}>
					<SelectTrigger>
						<SelectValue placeholder="Selecione a Série" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1ano">1º Ano</SelectItem>
						<SelectItem value="2ano">2º Ano</SelectItem>
						<SelectItem value="3ano">3º Ano</SelectItem>
					</SelectContent>
				</Select>

				<Select onValueChange={setClassGroup}>
					<SelectTrigger>
						<SelectValue placeholder="Selecione a Turma" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="a">Turma A</SelectItem>
						<SelectItem value="b">Turma B</SelectItem>
						<SelectItem value="c">Turma C</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Card className="w-full max-w-md p-4 border">
				<CardHeader>
					<CardTitle>Adicionar Material</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<div>
							<Label htmlFor="description">Descrição</Label>
							<Input
								id="description"
								value={materialDescription}
								onChange={(e) => setMaterialDescription(e.target.value)}
								placeholder="Ex: Caderno"
							/>
						</div>
						<div>
							<Label htmlFor="quantity">Quantidade</Label>
							<Input
								id="quantity"
								type="number"
								min={1}
								value={materialQuantity}
								onChange={(e) => setMaterialQuantity(e.target.value)}
								placeholder="Ex: 10"
							/>
						</div>
						<Button onClick={handleAddMaterial} className="w-full">
							Adicionar à Lista
						</Button>
					</div>
				</CardContent>
			</Card>

			<div className="w-full max-w-lg" ref={pdfRef}>
				{materials.length > 0 && (
					<table className="w-full border-collapse border mt-4">
						<thead>
							<tr>
								<th className="border p-2">Descrição</th>
								<th className="border p-2">Quantidade</th>
								<th className="border p-2">Ação</th>
							</tr>
						</thead>
						<tbody>
							{materials.map((item, index) => (
								<tr key={index}>
									<td className="border p-2">{item.description}</td>
									<td className="border p-2">{item.quantity}</td>
									<td className="border p-2">
										<Button
											onClick={() => handleRemoveMaterial(index)}
											variant="destructive"
										>
											Remover
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				{materials.length > 0 && (
					<Button onClick={handleDownloadPDF} className="mt-4">
						Baixar PDF
					</Button>
				)}
			</div>
		</div>
	)
}

export default ListaMateriaisIndex
