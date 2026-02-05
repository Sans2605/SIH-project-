"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add form submission logic, like sending the form data to an API
    console.log("Form submitted", formData);
    // Clear form data after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Card className="w-full md:w-[525px] mx-auto p-8 dark:bg-zinc-900">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-3xl font-bold dark:text-white">
          Contact Us
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-300 mt-2 text-lg">
          We&apos;d love to hear from you! Please reach out with any questions
          or feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 mt-6 px-0">
        <section>
          <h2 className="text-2xl font-bold text-blue-500 mb-5">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you have questions about our platform, need support, or just
            want to say hello, we&apos;re here to help!
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 dark:bg-zinc-800 dark:text-white border rounded-md"
              rows="5"
            />
          </div>

          <div>
            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
      <Button className="w-full" size="lg" asChild>
        <Link href="/">Go Back to Home</Link>
      </Button>
    </Card>
  );
}
