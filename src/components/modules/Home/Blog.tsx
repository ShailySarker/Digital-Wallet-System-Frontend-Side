import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

const data = [
  {
    title: "The Future of Digital Payments",
    excerpt: "How blockchain and AI are transforming the way we handle money.",
    date: "Dec 15, 2023",
    category: "Technology",
  },
  {
    title: "5 Tips for Financial Security",
    excerpt: "Essential practices to keep your digital wallet secure.",
    date: "Dec 10, 2023",
    category: "Security",
  },
  {
    title: "Managing Your Money On-the-Go",
    excerpt: "How mobile wallets are changing personal finance management.",
    date: "Dec 5, 2023",
    category: "Mobile",
  },
];

export default function Blog() {
  return (
    <div>
      <section className="xl:px-20 lg:px-14 md:px-10 px-5 xl:py-16 lg:py-10 md:py-8 py-7">
        <div className="text-center xl:mb-16 lg:mb-12 md:mb-10 mb-8">
          <h2 className="xl:text-4xl lg:text-3xl md:text-[27px] text-2xl italic font-bold xl:mb-4 lg:mb-3 mb-[6px]">
            From Our Blog
          </h2>
          <p className="xl:text-xl lg:text-lg md:text-base text-[15px] opacity-60 max-w-3xl mx-auto">
            Latest news and insights about digital finance
          </p>
        </div>

        <div className="grid md:grid-cols-3 xl:gap-8 lg:gap-6 md:gap-5 gap-4">
          {data?.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer py-0 xl:p-5 p-4">
                <CardContent className="px-0">
                  <div className="w-full xl:h-48 lg:h-44 md:h-40 h-36 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg xl:mb-4 md:mb-3 mb-2 flex items-center justify-center">
                    <FileText className="xl:h-12 xl:w-12 lg:h-11 lg:w-11 md:h-10 md:w-10 h-9 w-9 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">
                      <span className="lg:text-sm text-[13px] text-primary font-medium">
                        {post?.category}
                      </span>
                    </Badge>
                    <span className="lg:text-sm text-[13px] opacity-60">
                      {post?.date}
                    </span>
                  </div>
                  <h3 className="xl:text-xl lg:text-[19px] md:text-lg text-[17px] font-semibold md:mb-3 mb-2">
                    {post?.title}
                  </h3>
                  <p className="lg:text-base text-[15px] opacity-70 md:mb-4 mb-3">
                    {post?.excerpt}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        // variant="link"
                        variant="outline"
                        className="p-0 text-primary font-medium border-2"
                      >
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming Soon !</p>
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
