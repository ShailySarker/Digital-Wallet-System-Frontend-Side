import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Shield,
  Smartphone,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories = [
    {
      icon: CreditCard,
      title: "Account & Registration",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            'To create an account, click on the "Register" button, fill in your personal information, verify your phone number and email, and you\'re ready to start using our services.',
        },
        {
          question: "What documents do I need to register?",
          answer:
            "You need a valid government-issued ID (national ID) and personal details. For agent accounts, additional business documentation may be required.",
        },
        {
          question: "Is there an age requirement?",
          answer:
            "Yes, you must be at least 18 years old to create an account and use our services.",
        },
      ],
    },
    {
      icon: Gem,
      title: "Pricing",
      questions: [
        {
          question: "Can I change my plan later?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No hidden fees. All charges are clearly displayed before you confirm any transaction.",
        },
        {
          question: "Do you offer discounts for nonprofits?",
          answer:
            "Yes, we offer special pricing for registered nonprofit organizations. Contact our sales team for details.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit cards, debit cards, bank transfers, and mobile money payments.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      questions: [
        {
          question: "How secure is my money?",
          answer:
            "Your money is protected with bank-level security measures including 256-bit encryption, multi-factor authentication, and regular security audits. We also maintain insurance coverage for all deposits.",
        },
        {
          question: "What should I do if I suspect unauthorized activity?",
          answer:
            "Immediately contact our 24/7 support team, change your password, and enable two-factor authentication if you haven't already. We recommend monitoring your account regularly.",
        },
        {
          question: "Is my personal information safe?",
          answer:
            "Yes, we adhere to strict data protection regulations and never share your personal information with third parties without your consent. All data is encrypted and stored securely.",
        },
      ],
    },
    {
      icon: Smartphone,
      title: "Transactions & Payments",
      questions: [
        {
          question: "How long do transfers take?",
          answer:
            "Our services are secure and quick serve.Most transfers are instant. However, depending on the recipient's bank and transaction type.",
        },
        {
          question: "Are there any transaction limits?",
          answer:
            "Yes, limits vary based on your account verification level. Basic accounts have lower limits, while fully verified accounts enjoy higher transaction limits. You can view your limits in the app settings.",
        },
        {
          question: "What fees do you charge?",
          answer:
            "We offer many free services. Fees may apply for certain transactions like international transfers, expedited processing, or premium features. All fees are clearly displayed before you confirm any transaction.",
        },
      ],
    },
    {
      icon: HelpCircle,
      title: "General Questions",
      questions: [
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our 24/7 customer support through live chat in the app, email at support@digitalwallet.com, or phone at +1 (555) 123-4567. We also have an extensive help center with articles and guides.",
        },
        {
          question: "Can I use the service internationally?",
          answer:
            "Yes, our services are available in multiple countries. However, availability of specific features may vary by region due to local regulations. Check our website for country-specific information.",
        },
        {
          question: "What happens if I lose my phone?",
          answer:
            "Immediately contact our support team to temporarily freeze your account. You can also remotely wipe your wallet data from our website. Once you get a new phone, you can restore your account using your recovery phrase.",
        },
      ],
    },
  ];

  const allQuestions = categories.flatMap((category) =>
    category?.questions?.map((q) => ({ ...q, category: category.title }))
  );

  const filteredQuestions = allQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="xl:mt-8 lg:mt-6 md:mt-4 mt-3 xl:mb-24 lg:mb-20 md:mb-16 mb-12">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl italic font-bold xl:mb-4 lg:mb-3 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="xl:text-xl lg:text-lg md:text-[17px] opacity-80 max-w-3xl mx-auto">
            Find answers to common questions about our digital wallet services
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 opacity-70" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {searchTerm ? (
          // Search Results
          <div className="mx-auto">
            <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold mb-6">
              Search Results
            </h2>
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="lg:h-12 h-10 lg:w-12 w-10 opacity-80 mx-auto lg:mb-4 md:mb-3 mb-2" />
                <h3 className="lg:text-lg text-base font-medium opacity-90 mb-2">
                  No results found
                </h3>
                <p className="opacity-60 lg:text-base text-sm">
                  Try different search terms or browse the categories below
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions?.map((item, index) => (
                  <Card key={index} className="bg-accent">
                    <CardContent className="xl:pt-5 md:pt-4 pt-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="lg:text-sm text-xs text-primary bg-purple-200 border border-primary px-3 py-1 rounded-full mb-2 inline-block">
                            {item.category}
                          </span>
                          <h3 className="font-semibold mb-2 lg:text-base text-sm">
                            {item.question}
                          </h3>
                          <p className="opacity-60 lg:text-base text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Categories
          <div className="space-y-8">
            {categories?.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-accent rounded-lg mr-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const index = categoryIndex * 10 + questionIndex;
                    const isOpen = openItems.includes(index);

                    return (
                      <Card className="bg-accent" key={index}>
                        <CardContent className="xl:pt-5 md:pt-4 pt-3">
                          <button
                            onClick={() => toggleItem(index)}
                            className="flex items-center justify-between w-full text-left"
                          >
                            <h3 className="font-semibold pr-4 lg:text-base text-sm">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 opacity-80 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 opacity-80 flex-shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <p className="opacity-60 mt-4 lg:text-base text-sm">
                              {item.answer}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support CTA */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <HelpCircle className="lg:h-12 lg:w-12 w-10 h-10 text-white mx-auto lg:mb-4 md:mb-3 mb-2" />
              <h2 className="xl:text-2xl lg:text-[22px] md:text-xl text-lg font-bold mb-2">
                Still need help?
              </h2>
              <p className="text-blue-100 mb-4 lg:text-base text-sm">
                Our support team is available 24/7 to assist you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="">
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 w-full"
                  >
                    Contact Support
                  </Button>
                </Link>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className=" bg-white/10" variant="outline">
                      Live Chat
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
