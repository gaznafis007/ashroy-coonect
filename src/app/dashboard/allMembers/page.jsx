"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Info } from "lucide-react"

const AllMembers = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleApprove = (userId) => {
    // Implement approve logic here
    fetch(`/api/users?email=${userId}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status: 'approved'})
    })
    .then(res=> res.json())
    .then(data =>{
        console.log(data)
    })
    console.log(`Approved user ${userId}`)
  }
  useEffect(() => {
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users")
        }
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [handleApprove])


  const handleRemove = (userId) => {
    // Implement remove logic here
    console.log(`Removed user ${userId}`)
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-4xl text-center text-yellow-600 font-bold mb-8">Ashroy Members</h2>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Motivation</TableHead>
              <TableHead>Approve Request / Role</TableHead>
              <TableHead>Remove Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{new Date(user.dob).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog >
                      <DialogTrigger asChild>
                        <Button className='border border-yellow-400 text-yellow-400' variant="outline" size="sm">
                          <Info className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{user.name}'s Motivation</DialogTitle>
                          <DialogDescription>{user.description}</DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                
                      {
                        user.role === 'admin' ? (
                            <h4 className="text-gray-800 font-semibold">This is admin</h4>
                        ) : (
                            !user?.status ? (
                                <Button
                        onClick={() => handleApprove(user.email)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve {user?.role} request
                      </Button>
                            ) : (
                                <h4 className="text-gray-800 font-semibold">{user?.role}</h4>
                            )
                        )
                      }
                      </TableCell>
                      <TableCell>
                      <Button onClick={() => handleRemove(user.email)} size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}

export default AllMembers

