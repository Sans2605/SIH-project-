import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <Card className="w-full min-h-[700px] p-8 dark:bg-zinc-900">
      <div>
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold dark:text-white">About Us</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300 mt-2">
            Learn more about <strong>Alumni Connects</strong> and our mission to connect and inspire alumni worldwide.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-8 px-0">
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-5">Who We Are</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Alumni Connects</strong> is a vibrant community designed to strengthen the bond between alumni and their alma mater. Our
              platform brings together professionals, entrepreneurs, academics, and visionaries, fostering collaboration and building meaningful
              connections.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Whether yo&apos;re a recent graduate or an experienced professional, Alumni Connects offers resources to stay informed, share insights,
              and create opportunities that benefit both alumni and the broader community.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-5">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At <strong>Alumni Connects</strong>, our mission is to bridge the gap between alumni and their alma mater. We strive to:
            </p>
            <ul className="list-disc pl-5 mt-4 text-lg text-gray-700 dark:text-gray-300">
              <li>Foster lifelong relationships through networking and mentorship programs.</li>
              <li>Provide resources for professional development, including workshops and webinars.</li>
              <li>Encourage community involvement through philanthropic initiatives and volunteer opportunities.</li>
              <li>Create a platform for alumni to share stories, celebrate achievements, and inspire future generations.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-5">What We Offer</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Alumni Connects provides a variety of tools and services to support our community:
            </p>
            <ul className="list-disc pl-5 mt-4 text-lg text-gray-700 dark:text-gray-300">
              <li>
                <strong>Networking Events:</strong> Opportunities to connect with fellow alumni at local and international gatherings.
              </li>
              <li>
                <strong>Career Development:</strong> Access to job boards, mentorship programs, and career counseling tailored to your needs.
              </li>
              <li>
                <strong>Exclusive Content:</strong> Regular newsletters, webinars, and articles featuring insights from industry leaders and
                successful alumni.
              </li>
              <li>
                <strong>Giving Back:</strong> Participate in alumni-driven initiatives, scholarships, and community service projects.
              </li>
            </ul>
          </section>
        </CardContent>
      </div>
      <div className="mt-8 flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-5 rounded-xl">
        <h1 className="text-2xl font-bold dark:text-white">Sounds Interesting?</h1>
        <div className="flex gap-5 items-center">
          <Button className="w-full" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button
            className="w-full text-black dark:text-white bg-white dark:border-0 dark:bg-white/5 border font-semibold hover:bg-zinc-200 dark:hover:bg-white/15"
            size="lg"
            asChild
          >
            <Link href="/register">Join the Community</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
