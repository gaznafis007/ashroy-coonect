import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Edit, Trash } from "lucide-react"

export const ProjectCard = ({ project, onEdit, onDelete }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="capitalize">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{project.description}</p>
          <p className="font-semibold">Goal: {project.goal} BDT</p>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(project._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )