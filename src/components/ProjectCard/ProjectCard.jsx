import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"

export const ProjectCard = ({ project, onEdit, onDelete }) => {
  
  return (
  
  <motion.div
    layout
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={project?.coverImage || "/assets/images/23.jpg"} alt={project.title} layout="fill" objectFit="cover" />
      </div>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="capitalize text-xl font-bold">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{project.subheading}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-3">{project.motivation}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Goal: {project.goal} BDT</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between items-center">
        <Link href={`/projects/${project?._id}`}>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(project._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
)
}