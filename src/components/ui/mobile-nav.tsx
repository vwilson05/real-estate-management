"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "./button"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Properties", href: "/properties" },
  { name: "Transactions", href: "/transactions" },
  { name: "Repairs", href: "/repairs" },
  { name: "Issues", href: "/issues" },
  { name: "Tenants", href: "/tenants" },
  { name: "Calendar", href: "/calendar" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground/80 hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 