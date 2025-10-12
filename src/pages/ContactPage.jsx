import { useState } from "react";

function ContactPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		subject: "",
		email: "",
		body: "",
	});

	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validate = () => {
		const newErrors = {};

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required";
		} else if (formData.fullName.trim().length < 3) {
			newErrors.fullName = "Full name must be at least 3 characters";
		}

		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		} else if (formData.subject.trim().length < 3) {
			newErrors.subject = "Subject must be at least 3 characters";
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Body validation
		if (!formData.body.trim()) {
			newErrors.body = "Message body is required";
		} else if (formData.body.trim().length < 3) {
			newErrors.body = "Message body must be at least 3 characters";
		}

		return newErrors;
	};

	// Handle submit
	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = validate();

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// OK - console.log data
		console.log("Form submitted successfully:", formData);

		setSubmitted(true);

		// Reset form
		setFormData({
			fullName: "",
			subject: "",
			email: "",
			body: "",
		});

		// Hide success message
		setTimeout(() => {
			setSubmitted(false);
		}, 3000);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold text-text-primary mb-8">Contact Us</h1>

				{submitted && <div className="mb-6 bg-success-500 text-white p-4 rounded-lg">Thank you! Your message has been sent successfully.</div>}

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Full Name */}
					<div>
						<label htmlFor="fullName" className="block text-text-primary font-medium mb-2">
							Full Name *
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 ${errors.fullName ? "border-red-500" : "border-border"}`}
							placeholder="John Doe"
						/>
						{errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
					</div>

					{/* Subject */}
					<div>
						<label htmlFor="subject" className="block text-text-primary font-medium mb-2">
							Subject *
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 ${errors.subject ? "border-red-500" : "border-border"}`}
							placeholder="Enter subject"
						/>
						{errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-text-primary font-medium mb-2">
							Email *
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 ${errors.email ? "border-red-500" : "border-border"}`}
							placeholder="email@example.com"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
					</div>

					{/* Body */}
					<div>
						<label htmlFor="body" className="block text-text-primary font-medium mb-2">
							Message *
						</label>
						<textarea
							id="body"
							name="body"
							value={formData.body}
							onChange={handleChange}
							rows="6"
							className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none ${errors.body ? "border-red-500" : "border-border"}`}
							placeholder="Enter your message"
						/>
						{errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
					</div>

					{/* Submit button */}
					<button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-bold transition-colors">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactPage;
