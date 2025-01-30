"use client"
import { motion } from "framer-motion"
import CounterEffect from "../CounterEffect/CounterEffect"
import { useEffect, useState } from "react"




export default function Stats() {
  const [events, setEvents] = useState(null)
  const [projects, setProjects] = useState(null);
  const [volunteers, setVolunteers] = useState(null);
  const [contribution, setContributions] = useState(null);
  const fetchEvents = async () =>{
    const response = await fetch("/api/manageEvents");
    const data = await response.json();
    setEvents(data.length);
    const helped = data.reduce((sum, item) => sum + (parseFloat(item?.totalDistribution) || 0), 0);
    setContributions(helped)
  }
  const fetchProjects = async() =>{
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data.length);
  }
  const fetchUsers = async() =>{
    const response = await fetch("/api/users");
    const data = await response.json();
    const items = data.filter(item => item?.role === 'volunteer')
    setVolunteers(items.length);
  }
  useEffect(() =>{
    fetchEvents();
    fetchProjects()
    fetchUsers()
  },[])
  const stats = [
    { label: "Lives Impacted", value:contribution },
    { label: "Volunteers", value: volunteers },
    { label: "Total projects", value: projects },
    { label: "Communities Served", value: events },
  ]
  return (
    <section id="impact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                <CounterEffect target={stat?.value} duration={1}/>
              </div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

