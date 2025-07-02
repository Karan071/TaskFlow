"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Layers,
  Smartphone,
  Shield,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-neutral-100 text-neutral-900">
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <nav className="flex justify-between items-center mb-16 mx-7">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-royalBlue to-[#465CDA] rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-800">TaskFlow</span>
            </div>
          </nav>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-neutral-900"
      }`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: isDarkMode
            ? "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMzMzMiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')"
            : "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMGU3ZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16 mx-7">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-royalBlue to-[#465CDA] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold text-neutral-800`}>
              TaskFlow
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center space-y-8 mb-32">
          <div
            className={`inline-flex items-center px-4 py-2 ${
              isDarkMode
                ? "bg-neutral-800/60 backdrop-blur-sm rounded-full border border-neutral-700/20 shadow-sm"
                : "bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-sm"
            }`}
          >
            <span className={`flex items-center justify-center border border-transparent rounded-full transition-all duration-200`}>
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
            </span>
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              Productivity Reimagined
            </span>
          </div>

          <h1
            className={`text-6xl md:text-7xl font-bold ${
              isDarkMode
                ? "bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-200"
                : "bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-800"
            } bg-clip-text text-transparent leading-tighter`}
          >
            Stay Organized.
            <br />
            <span className="text-blue-600 font-playfair">
              Get Things Done.
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl ${
              isDarkMode ? "text-neutral-300" : "text-neutral-600"
            } max-w-3xl mx-auto leading-relaxed`}
          >
            Transform your workflow with our intuitive Kanban-style task
            management system.
            <span className="text-blue-600 font-medium">
              {" "}
              Beautiful, powerful, and effortless.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/apps"
                className="group bg-gradient-to-r from-royalBlue to-[#465CDA] text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Managing Tasks</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: Layers,
              title: "Kanban Boards",
              desc: "Visualize your workflow with elegant To Do, In Progress, and Done columns that adapt to your needs.",
            },
            {
              icon: Target,
              title: "Smart Prioritization",
              desc: "Focus on what matters most with intelligent priority labels and visual indicators.",
            },
            {
              icon: Plus,
              title: "Instant Task Creation",
              desc: "Capture ideas instantly with our lightning-fast task creation interface.",
            },
            {
              icon: Zap,
              title: "Drag & Drop Magic",
              desc: "Move tasks effortlessly between columns with smooth, intuitive drag-and-drop interactions.",
            },
            {
              icon: Shield,
              title: "Never Lose Progress",
              desc: "Your tasks are automatically saved and synced across all your devices, always.",
            },
            {
              icon: Smartphone,
              title: "Works Everywhere",
              desc: "Seamlessly manage tasks on desktop, tablet, or mobile with our responsive design.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`group p-8 ${
                isDarkMode
                  ? "bg-neutral-800/70 backdrop-blur-sm rounded-3xl border border-neutral-700/40 shadow-sm hover:shadow-xl"
                  : "bg-white/70 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-xl"
              } transition-all duration-300`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-royalBlue to-[#465CDA] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 text-neutral-800`}>
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 leading-tight">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-[#465CDA] to-[#465CDA] bg-clip-text text-transparent">
              Productivity?
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join thousands of users who have already streamlined their workflow
            with TaskFlow.
          </p>
          <div className="pt-6">
            <Link
              href="/apps"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-royalBlue to-[#465CDA] text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200/50 pt-12 pb-8 mx-20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-royalBlue to-[#465CDA] rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-neutral-700">TaskFlow</span>
            </div>
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} TaskFlow.
            </div>
            <div className="flex space-x-6 text-sm text-neutral-500">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
