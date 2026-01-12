"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal } from "lucide-react"

export function StaysFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 p-6 bg-card rounded-lg border border-border">
      <div className="flex-1">
        <label className="text-sm font-medium text-card-foreground mb-2 block">Location</label>
        <Input placeholder="Search by city..." className="h-11" />
      </div>
      <div className="w-full md:w-48">
        <label className="text-sm font-medium text-card-foreground mb-2 block">Price Range</label>
        <Select>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-200">$0 - $200</SelectItem>
            <SelectItem value="200-300">$200 - $300</SelectItem>
            <SelectItem value="300-400">$300 - $400</SelectItem>
            <SelectItem value="400+">$400+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-48">
        <label className="text-sm font-medium text-card-foreground mb-2 block">Guests</label>
        <Select>
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2">1-2 guests</SelectItem>
            <SelectItem value="3-4">3-4 guests</SelectItem>
            <SelectItem value="5+">5+ guests</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button variant="outline" className="h-11 gap-2 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  )
}
