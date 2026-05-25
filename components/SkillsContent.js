"use client";

import { motion } from "framer-motion";
import SkillsShowcase from "@/components/SkillsShowcase";
import InterviewTask from "@/components/InterviewTask";

export default function SkillsContent({ skills }) {
  return (
    <>
      {/* <InterviewTask /> */}
      <SkillsShowcase skills={skills} />
    </>
  );
}
