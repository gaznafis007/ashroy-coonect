"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Snowflake, Moon, Loader2, Goal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// const events = [
//   {
//     _id: 1,
//     name: "Winter Smile",
//     description: "Bringing warmth and joy to those in need during the cold winter months.",
//     icon: Snowflake,
//     date: "December 15 - January 15",
//   },
//   {
//     _id: 2,
//     name: "Eid Smile",
//     description: "Celebrating the spirit of giving and community during the festive season of Eid.",
//     icon: Moon,
//     date: "Varies based on Islamic calendar",
//   },
// ]

const OurEvents = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Our Projects
          </h2>
          <h4 className="text-2xl font-thin text-center text-slate-950 mt-2 md:mt-4">
            These are two main way to share smile with everyone where financial
            or other conditions are not the question
          </h4>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((event, index) => (
            <motion.div
              key={event?._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-yellow-400 bg-opacity-10 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 rounded-full p-3 capitalize">
                      {event?.title.includes("Winter") ? (
                        <Snowflake className="w-8 h-8 text-white" />
                      ) : event?.title.includes("Eid") ? (
                        <Moon className="w-8 h-8 text-white" />
                      ) : (
                        <Goal className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {event.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{event.subheading}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed">
                    {event.motivation.slice(0, 150)}...
                  </p>
                  <Link
                    href={`/projects/${event._id}`}
                    className="px-4 py-2 rounded-full bg-yellow-400 text-slate-950 mt-4 inline-block"
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurEvents;
