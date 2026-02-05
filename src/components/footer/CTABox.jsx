import React from "react";
import { Button } from "../ui/button";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Link from "next/link";

const CTABox = () => {
  return (
    <MaxWidthWrapper className="h-auto mb-[5rem] z-50">
      <div className="bg-primary flex justify-between flex-col md:flex-row items-start md:items-center px-8 py-12 w-full gap-8">
        <h1 className="text-4xl text-white font-heading">
          Check out our
          <br />
          Student corner
        </h1>
        <div className="md:w-[350px] flex flex-col gap-4">
          <Button
            className="py-6 text-md font-bold"
            size="lg"
            variant="secondary"
            asChild
          >
            <Link href="/register">Explore Now</Link>
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CTABox;
