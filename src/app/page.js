import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="h-full px-4 flex items-center justify-center flex-col w-full bg-home-bgs bg-[#181A1C] bg-cover">
        <h1 className="text-white text-center font-heading text-4xl md:text-6xl font-[500]">
          Reunite with your <br /> Batchmates
        </h1>
        <p className="text-white text-center text-md md:text-lg font-normal mt-8 max-w-[500px]">
          Welcome to the official (College Name) Alumni Network, where past meets the present and future. Our vibrant community of graduates is spread
          across the globe, excelling in diverse fields.
        </p>
        <Button className="mt-8 text-md" asChild size="lg">
          <Link href="/register">Register</Link>
        </Button>
      </section>
      <section className="pt-8 pb-24 md:py-28 px-2 bg-[#181A1C]">
        <MaxWidthWrapper>
          <div className="flex items-start gap-16 md:items-center flex-col md:flex-row justify-evenly w-full">
            <div className="h-full flex flex-col items-start justify-center">
              <h1 className="text-white font-heading text-3xl font-[500]">
                New to this program? <br /> Join Us
              </h1>
              <Button className="mt-5 px-12 text-md bg-white/5 font-semibold hover:bg-white/15" size="lg">
                <Link className="flex items-center gap-2" href="/register">
                  Register <ArrowUpRightIcon color="#0260f5" />
                </Link>
              </Button>
            </div>
            <div className="h-full flex flex-col items-start justify-center">
              <h1 className="text-white font-heading text-3xl font-[500]">
                Already a part of <br /> community?
              </h1>
              <Button className="mt-5 px-12 text-md bg-white/5 font-semibold hover:bg-white/15" size="lg">
                <Link className="flex items-center gap-2" href="login">
                  Login <ArrowUpRightIcon color="#0260f5" />
                </Link>
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="dark:bg-[#181A1C]">
        <MaxWidthWrapper className="py-28 flex flex-col gap-12">
          <div className="flex flex-col w-full">
            <h1 className="font-heading text-3xl font-semibold underline decoration-primary decoration-[7px] underline-offset-[12px]">
              About Alumni Connects
            </h1>
            <p className="text-lg font-normal mt-8 max-w-[500px]">
              An official Alumni Network, where past meets the present and future. Our vibrant community of graduates is spread across the globe,
              excelling in diverse fields.
            </p>
          </div>

          <div className="flex flex-col items-end w-full">
            <h1 className="font-heading text-3xl font-semibold underline decoration-primary decoration-[7px] underline-offset-[12px]">Job Portal</h1>
            <p className="text-lg text-right font-normal mt-8 max-w-[500px]">
              Welcome to the Job Portal — the hub for career growth within our Alumni Network. This platform bridges the gap between alumni, students,
              and recruiters, enabling meaningful connections and professional development.
            </p>
          </div>

          <div className="flex flex-col w-full">
            <h1 className="font-heading text-3xl font-semibold underline decoration-primary decoration-[7px] underline-offset-[12px]">
              Community and Events
            </h1>
            <p className="text-lg font-normal mt-8 max-w-[500px]">
              The Community & Events section is at the heart of our Alumni Network, where relationships grow and memories are made. Stay engaged with
              fellow alumni and current students through a variety of events, both online and in-person.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>
      <Footer />
    </>
  );
}
