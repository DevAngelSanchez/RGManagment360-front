"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { phoneNumberValidation } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import AlertComponent from "@/components/custom/alert";
import { CreateUser } from "./actions";

const formSchema = z.object({
	name: z.string().min(3, {
		message: "Invalid name"
	}).trim(),
	lastname: z.string().min(3, {
		message: "Invalid name"
	}).trim(),
	username: z.string().min(3, {
		message: "Invalid name"
	}).trim(),
	email: z
		.string()
		.email({
			message: "Not valid email",
		})
		.trim(),
	password: z.string().trim(),
	address: z.string().trim(),
	phone: z.string().regex(phoneNumberValidation, {
		message: "Invalid Format"
	}).trim(),
	role: z.string().trim()
});

export default function CreateUserForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

	function resetAlert() {
		return setAlert({ title: "", description: "", type: "default", show: false });
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			lastname: "",
			username: '',
			email: "",
			password: "",
			address: "",
			phone: "",
			role: ""
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { name, lastname, username, email, password, address, phone, role } = values;
			setIsLoading(true);
			const result = await CreateUser(name, lastname, username, email, password, address, phone, role);
			setIsLoading(false);
			if (result.type === "error") {
				resetAlert();
				setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
				setTimeout(() => {
					resetAlert();
				}, 3000);
				return null;
			}
			setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
			setTimeout(() => {
				resetAlert();
			}, 3000);
			router.refresh();
		} catch (error) {
			resetAlert();
			setAlert({ title: "Error!", description: "Error trying to create a new User", type: "error", show: true });
			setTimeout(() => {
				resetAlert()
			}, 3000);
			console.log(error);
			return;
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
					<div className="w-full">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="John" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="lastname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lastname</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
					<div className="w-full">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="JohnDoe2" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="john@gmail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input placeholder="P. Sherman, wallaby street, 42, sidney" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
					<div className="w-full">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input type="text" placeholder="+1 800-555-5555" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="w-full">
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Role</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a Role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="MANAGER">
											Manager
										</SelectItem>
										<SelectItem value="ASSISTANT">
											Assistant
										</SelectItem>
										<SelectItem value="CUSTOMER">
											Customer
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full" type="submit" disabled={isLoading}>
					{isLoading ? (
						<span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
					) : (
						<>
							<IconPlus size={24} />
							<span>Add User</span>
						</>
					)}
				</Button>
			</form >

			{alert.show && (
				<AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
			)}
		</Form >
	);
}
