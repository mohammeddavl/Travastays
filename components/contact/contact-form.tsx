"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[150px] resize-none"
            required
          />
        </div>
        <Button type="submit" className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
          <Send className="h-5 w-5 mr-2" />
          Send Message
        </Button>
      </form>
    </div>
  )
}
