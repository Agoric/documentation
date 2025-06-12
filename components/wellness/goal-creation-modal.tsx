"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { FinancialGoal, Milestone } from "./financial-goal-card"

interface GoalCreationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (goal: FinancialGoal) => void
  initialData?: FinancialGoal | null
}

export function GoalCreationModal({ open, onOpenChange, onSave, initialData }: GoalCreationModalProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState<FinancialGoal["category"]>("savings")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [targetDate, setTargetDate] = useState<Date>(new Date())
  const [description, setDescription] = useState("")
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [contributionFrequency, setContributionFrequency] = useState<FinancialGoal["contributionFrequency"]>("monthly")
  const [autoContribution, setAutoContribution] = useState(true)
  const [contributionAmount, setContributionAmount] = useState("")
  const [priority, setPriority] = useState<FinancialGoal["priority"]>("medium")

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setCategory(initialData.category)
      setTargetAmount(initialData.targetAmount.toString())
      setCurrentAmount(initialData.currentAmount.toString())
      setStartDate(initialData.startDate)
      setTargetDate(initialData.targetDate)
      setDescription(initialData.description || "")
      setMilestones(initialData.milestones)
      setContributionFrequency(initialData.contributionFrequency)
      setAutoContribution(initialData.autoContribution)
      setContributionAmount(initialData.contributionAmount.toString())
      setPriority(initialData.priority)
    } else {
      // Set defaults for new goal
      resetForm()
    }
  }, [initialData])

  const resetForm = () => {
    setName("")
    setCategory("savings")
    setTargetAmount("")
    setCurrentAmount("")
    setStartDate(new Date())
    setTargetDate(new Date(new Date().setMonth(new Date().getMonth() + 12)))
    setDescription("")
    setMilestones([])
    setContributionFrequency("monthly")
    setAutoContribution(true)
    setContributionAmount("")
    setPriority("medium")
  }

  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      name: "",
      targetDate: new Date(),
      amount: 0,
      completed: false,
    }
    setMilestones([...milestones, newMilestone])
  }

  const handleUpdateMilestone = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(milestones.map((milestone) => (milestone.id === id ? { ...milestone, [field]: value } : milestone)))
  }

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id))
  }

  const handleSubmit = () => {
    // Validate form
    if (!name || !targetAmount || !currentAmount || !contributionAmount) {
      // Show error
      return
    }

    const newGoal: FinancialGoal = {
      id: initialData?.id || Date.now().toString(),
      name,
      category,
      targetAmount: Number.parseFloat(targetAmount),
      currentAmount: Number.parseFloat(currentAmount),
      startDate,
      targetDate,
      description: description || undefined,
      milestones,
      contributionFrequency,
      autoContribution,
      contributionAmount: Number.parseFloat(contributionAmount),
      priority,
    }

    onSave(newGoal)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Goal" : "Create New Financial Goal"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update your financial goal details and track your progress."
              : "Set up a new financial goal to track your progress and stay motivated."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                placeholder="e.g., Emergency Fund"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as FinancialGoal["category"])}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="debt">Debt Repayment</SelectItem>
                  <SelectItem value="purchase">Major Purchase</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount ($)</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="e.g., 10000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount ($)</Label>
              <Input
                id="currentAmount"
                type="number"
                placeholder="e.g., 2500"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !targetDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={(date) => date && setTargetDate(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal and why it's important to you"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Milestones</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddMilestone}>
                <Plus className="h-4 w-4 mr-1" />
                Add Milestone
              </Button>
            </div>

            {milestones.length > 0 ? (
              <div className="space-y-3">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-3 p-3 border rounded-md">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                        milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {milestone.completed ? <Award className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                      <Input
                        placeholder="Milestone name"
                        value={milestone.name}
                        onChange={(e) => handleUpdateMilestone(milestone.id, "name", e.target.value)}
                      />

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !milestone.targetDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {milestone.targetDate ? format(milestone.targetDate, "PP") : "Target date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={milestone.targetDate}
                            onSelect={(date) => date && handleUpdateMilestone(milestone.id, "targetDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={milestone.amount || ""}
                          onChange={(e) =>
                            handleUpdateMilestone(milestone.id, "amount", Number.parseFloat(e.target.value) || 0)
                          }
                          className="flex-1"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMilestone(milestone.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border rounded-md border-dashed">
                <Target className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No milestones added yet</p>
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleAddMilestone}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Milestone
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
              <Select
                value={contributionFrequency}
                onValueChange={(value) => setContributionFrequency(value as FinancialGoal["contributionFrequency"])}
              >
                <SelectTrigger id="contributionFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contributionAmount">Contribution Amount ($)</Label>
              <Input
                id="contributionAmount"
                type="number"
                placeholder="e.g., 500"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="autoContribution">Auto Contribution</Label>
              <Switch id="autoContribution" checked={autoContribution} onCheckedChange={setAutoContribution} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as FinancialGoal["priority"])}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-violet-600 to-indigo-600">
            {initialData ? "Update Goal" : "Create Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
