'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, PieChart, Pie, Cell } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiUrl } from '@/auth.config';
import { PropertyType } from '../service-provider/tasks/data/schema';
import { useToast } from '@/components/hooks/use-toast';

interface Props {
  clientId?: string;
}

interface BackendTask {
  id: string;
  category: { name: string } | null;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in progress' | 'done' | 'canceled';
}

interface Task {
  id: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in progress' | 'done' | 'canceled';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const priorityConfig: ChartConfig = {
  high: { label: 'High', color: '#FF0000' },
  medium: { label: 'Medium', color: '#FFA500' },
  low: { label: 'Low', color: '#00FF00' },
};

const statusConfig: ChartConfig = {
  pending: { label: 'Pending', color: '#FF6347' },
  'in progress': { label: 'In Progress', color: '#1E90FF' },
  completed: { label: 'Completed', color: '#32CD32' },
};

export default function TaskDashboard({ clientId }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!clientId) return;

      try {
        // Obtener propiedades del cliente
        const propertiesResponse = await fetch(`${apiUrl}api/properties/client/${clientId}`);
        const properties: PropertyType[] = await propertiesResponse.json();

        // Obtener tareas para cada propiedad
        const allTasks: Task[] = [];
        for (const property of properties) {
          const tasksResponse = await fetch(`${apiUrl}api/tasks/property/${property.id}`);
          const propertyTasks: BackendTask[] = await tasksResponse.json();

          const formattedTasks = propertyTasks.map((task) => ({
            id: task.id,
            category: task.category?.name || 'Uncategorized',
            priority: task.priority,
            status: task.status,
          }));

          allTasks.push(...formattedTasks);
        }

        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error trying to get tasks",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [clientId]);

  console.log("Tasklist: ", tasks)

  const getPriorityData = () => {
    const counts = { high: 0, medium: 0, low: 0 };

    tasks.forEach((task) => {
      counts[task.priority]++;
    });

    return [
      { name: 'High', value: counts.high },
      { name: 'Medium', value: counts.medium },
      { name: 'Low', value: counts.low },
    ];
  };

  const getCategoryData = () => {
    const categoryCounts: Record<string, number> = {};

    tasks.forEach((task) => {
      categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getStatusData = () => {
    const counts = { todo: 0, canceled: 0, 'in progress': 0, done: 0 };

    tasks.forEach((task) => {
      counts[task.status]++;
    });

    return [
      { name: 'To-do', value: counts.todo },
      { name: 'In Progress', value: counts['in progress'] },
      { name: 'Done', value: counts.done },
      { name: 'Canceled', value: counts.canceled },
    ];
  };

  const renderBarChart = () => (
    <ChartContainer config={priorityConfig} className="min-h-[200px] w-full">
      <BarChart data={getPriorityData()}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="value" fill="#8884d8" radius={4} />
      </BarChart>
    </ChartContainer>
  );

  const renderPieChart = (data: { name: string; value: number }[]) => (
    <ChartContainer config={{}} className="min-h-[200px] w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name} // Mostrar nombre del status
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );

  const renderDonutChart = (data: { name: string; value: number }[]) => (
    <ChartContainer config={statusConfig} className="min-h-[200px] w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
          paddingAngle={5}
          dataKey="value"
          label={({ name }) => name} // Mostrar nombre del status
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-5 mt-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Task Priority</CardTitle>
        </CardHeader>
        <CardContent>{renderBarChart()}</CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Task Categories</CardTitle>
        </CardHeader>
        <CardContent>{renderPieChart(getCategoryData())}</CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Task Status</CardTitle>
        </CardHeader>
        <CardContent>{renderDonutChart(getStatusData())}</CardContent>
      </Card>
    </div>
  );
}
