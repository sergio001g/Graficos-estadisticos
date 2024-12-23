'use client'

import { useState, useEffect } from 'react'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function Home() {
  const [data, setData] = useState({
    pieData: [
      {category: "Categoría 1", value: 30},
      {category: "Categoría 2", value: 50},
      {category: "Categoría 3", value: 20},
      {category: "Categoría 4", value: 40},
      {category: "Categoría 5", value: 60}
    ],
    barData: [
      {category: "Categoría 1", value: 65},
      {category: "Categoría 2", value: 45},
      {category: "Categoría 3", value: 80},
      {category: "Categoría 4", value: 30},
      {category: "Categoría 5", value: 55}
    ]
  })

  const [colors, setColors] = useState(COLORS)
  const [editIndex, setEditIndex] = useState(null)

  const handleColorChange = (index, color) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const handleEdit = (index, type) => {
    setEditIndex({ index, type })
  }

  const handleSave = (index, type) => {
    setEditIndex(null)
  }

  const handleChange = (index, field, value, type) => {
    const newData = { ...data }
    newData[type][index][field] = field === 'value' ? Number(value) : value
    setData(newData)
  }

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Estadísticas de Pastel y Barras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Gráfico de Pastel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.pieData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Gráfico de Barras</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.barData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" animationBegin={0} animationDuration={1500}>
                  {data.barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray-800 text-white border-gray-700 mt-8">
        <CardHeader>
          <CardTitle className="text-white">Configuración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Colores</h3>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Label htmlFor={`color-${index}`} className="mr-2">Color {index + 1}</Label>
                  <Input
                    className="bg-gray-700 text-white border-gray-600"
                    id={`color-${index}`}
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-12 h-8"
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Datos</h3>
              {['pieData', 'barData'].map((type) => (
                <div key={type}>
                  <h4 className="font-medium mt-2">{type === 'pieData' ? 'Pastel' : 'Barras'}</h4>
                  {data[type].map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      {editIndex && editIndex.index === index && editIndex.type === type ? (
                        <>
                          <Input
                            className="bg-gray-700 text-white border-gray-600 mr-2"
                            value={item.category}
                            onChange={(e) => handleChange(index, 'category', e.target.value, type)}
                          />
                          <Input
                            className="bg-gray-700 text-white border-gray-600 mr-2 w-20"
                            type="number"
                            value={item.value}
                            onChange={(e) => handleChange(index, 'value', e.target.value, type)}
                          />
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleSave(index, type)}>Guardar</Button>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">{item.category}: {item.value}</span>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleEdit(index, type)}>Editar</Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

