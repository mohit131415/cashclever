'use client'

import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/utils/formatCurrency'
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ExpenseSummary({ expenses }) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 450, 200, 600, 400, 350, 500],
        backgroundColor: 'hsl(var(--primary) / 0.2)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        borderRadius: 8,
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          callback: (value) => formatCurrency(value),
          font: {
            size: 10,
            md: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10,
            md: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        bodyFont: {
          size: 12
        },
        titleFont: {
          size: 12
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      const chart = ChartJS.getChart("expenses-chart");
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg font-semibold">Expense Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="week" className="space-y-4">
            <TabsList className="inline-flex h-8 md:h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="week" className="rounded-md px-2.5 py-1 text-xs md:text-sm font-medium">
                Week
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-md px-2.5 py-1 text-xs md:text-sm font-medium">
                Month
              </TabsTrigger>
              <TabsTrigger value="year" className="rounded-md px-2.5 py-1 text-xs md:text-sm font-medium">
                Year
              </TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-lg md:text-2xl font-bold">{formatCurrency(2800)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-muted-foreground">Average/Day</p>
                  <p className="text-lg md:text-2xl font-bold">{formatCurrency(400)}</p>
                </div>
              </div>

              <div className="h-[180px] md:h-[200px]">
                <Bar id="expenses-chart" data={chartData} options={chartOptions} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
