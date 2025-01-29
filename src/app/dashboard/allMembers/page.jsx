"use client"
import React, { useEffect, useState, useCallback } from "react"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react"

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const AllMembers = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userToRemove, setUserToRemove] = useState(null)
  const { toast } = useToast()

  const fetchUsers = useCallback(() => {
    setLoading(true)
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
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleApprove = async (userId) => {
    try {
      const res = await fetch(`/api/users?email=${userId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      })
      const data = await res.json()
      if (res.ok) {
        toast({
          title: "User Approved",
          description: `${data.name} has been successfully approved.`,
          duration: 3000,
        })
        fetchUsers() // Refresh the user list
      } else {
        throw new Error(data.message || "Failed to approve user")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleRemove = async (user) => {
    if (!user) return

    try {
      const res = await fetch(`/api/users/${user?._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (res.ok && data.deletedCount > 0) {
        toast({
          title: "User Removed",
          description: `${user?.name} has been successfully removed.`,
          duration: 3000,
        })
        setUserToRemove(null)
        fetchUsers() // Refresh the user list
      } else {
        throw new Error(data.message || "Failed to remove user")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      })
    }
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="border border-yellow-400 text-yellow-400" variant="outline" size="sm">
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
                    {user.role === "admin" ? (
                      <span className="text-gray-800 font-semibold">Admin</span>
                    ) : !user?.status ? (
                      <Button
                        onClick={() => handleApprove(user.email)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve {user?.role} request
                      </Button>
                    ) : (
                      <span className="text-gray-800 font-semibold capitalize">{user?.role}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Removal</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove {user.name}? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="destructive" onClick={() => handleRemove(user)}>
                            Confirm Remove
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Toaster />
    </motion.div>
  )
}

export default AllMembers

